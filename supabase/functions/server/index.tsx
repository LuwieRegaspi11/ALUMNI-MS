import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-fb96ca04/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// ALUMNI MANAGEMENT ROUTES
// ========================================

// Get all alumni
app.get("/make-server-fb96ca04/alumni", async (c) => {
  try {
    const alumni = await kv.getByPrefix("alumni:");
    return c.json({ success: true, data: alumni });
  } catch (error) {
    console.log("Error fetching alumni:", error);
    return c.json({ success: false, error: "Failed to fetch alumni" }, 500);
  }
});

// Get single alumni by ID
app.get("/make-server-fb96ca04/alumni/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const alumni = await kv.get(`alumni:${id}`);
    if (!alumni) {
      return c.json({ success: false, error: "Alumni not found" }, 404);
    }
    return c.json({ success: true, data: alumni });
  } catch (error) {
    console.log("Error fetching alumni:", error);
    return c.json({ success: false, error: "Failed to fetch alumni" }, 500);
  }
});

// Create new alumni
app.post("/make-server-fb96ca04/alumni", async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const alumniData = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      verified: false,
      isBatchVerified: false,
    };
    await kv.set(`alumni:${id}`, alumniData);

    // Log audit trail
    await logAudit({
      action: "Created Alumni Record",
      details: `New alumni registered: ${body.name}`,
      userId: body.userId || "system",
      module: "Alumni Database",
    });

    return c.json({ success: true, data: alumniData });
  } catch (error) {
    console.log("Error creating alumni:", error);
    return c.json({ success: false, error: "Failed to create alumni record" }, 500);
  }
});

// Update alumni
app.put("/make-server-fb96ca04/alumni/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`alumni:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Alumni not found" }, 404);
    }
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    await kv.set(`alumni:${id}`, updated);

    // Log audit trail
    await logAudit({
      action: "Modified Alumni Record",
      details: `Updated alumni: ${updated.name} (ID: ${id})`,
      userId: body.userId || "system",
      module: "Alumni Database",
    });

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating alumni:", error);
    return c.json({ success: false, error: "Failed to update alumni" }, 500);
  }
});

// Delete alumni
app.delete("/make-server-fb96ca04/alumni/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`alumni:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Alumni not found" }, 404);
    }
    await kv.del(`alumni:${id}`);

    // Log audit trail
    await logAudit({
      action: "Deleted Alumni Record",
      details: `Deleted alumni: ${existing.name} (ID: ${id})`,
      userId: "system",
      module: "Alumni Database",
    });

    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting alumni:", error);
    return c.json({ success: false, error: "Failed to delete alumni" }, 500);
  }
});

// ========================================
// BATCH REPRESENTATIVE ROUTES
// ========================================

// Verify alumni (batch representative action)
app.post("/make-server-fb96ca04/alumni/:id/batch-verify", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { representativeId, representativeName } = body;

    const alumni = await kv.get(`alumni:${id}`);
    if (!alumni) {
      return c.json({ success: false, error: "Alumni not found" }, 404);
    }

    const updated = {
      ...alumni,
      isBatchVerified: true,
      batchVerifiedBy: representativeName,
      batchVerifiedAt: new Date().toISOString(),
      batchVerifiedById: representativeId,
    };

    await kv.set(`alumni:${id}`, updated);

    // Log audit trail (RA 10175 compliant)
    await logAudit({
      action: "Batch Verified Alumni",
      details: `${representativeName} verified ${alumni.name} (ID: ${id})`,
      userId: representativeId,
      module: "Batch Verification",
      severity: "High",
    });

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error batch verifying alumni:", error);
    return c.json({ success: false, error: "Failed to verify alumni" }, 500);
  }
});

// Get all batch representatives
app.get("/make-server-fb96ca04/representatives", async (c) => {
  try {
    const reps = await kv.getByPrefix("representative:");
    return c.json({ success: true, data: reps });
  } catch (error) {
    console.log("Error fetching representatives:", error);
    return c.json({ success: false, error: "Failed to fetch representatives" }, 500);
  }
});

// Assign batch representative
app.post("/make-server-fb96ca04/representatives", async (c) => {
  try {
    const body = await c.req.json();
    const { alumniId, batchYear, department, program } = body;

    // Check unique constraint: one rep per batch+dept+program
    const existingReps = await kv.getByPrefix("representative:");
    const duplicate = existingReps.find(rep =>
      rep.batchYear === batchYear &&
      rep.department === department &&
      rep.program === program &&
      rep.status === 'Active'
    );

    if (duplicate) {
      return c.json({
        success: false,
        error: "A representative already exists for this batch/department/program combination"
      }, 400);
    }

    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const repData = {
      id,
      ...body,
      assignedDate: new Date().toISOString(),
      verificationsCount: 0,
      status: 'Active',
    };

    await kv.set(`representative:${id}`, repData);

    // Log audit trail
    await logAudit({
      action: "Assigned Batch Representative",
      details: `Assigned representative for Batch ${batchYear} ${department} ${program}`,
      userId: body.userId || "admin",
      module: "Batch Representatives",
    });

    return c.json({ success: true, data: repData });
  } catch (error) {
    console.log("Error assigning representative:", error);
    return c.json({ success: false, error: "Failed to assign representative" }, 500);
  }
});

// ========================================
// DONATIONS ROUTES
// ========================================

// Get all donations
app.get("/make-server-fb96ca04/donations", async (c) => {
  try {
    const donations = await kv.getByPrefix("donation:");
    return c.json({ success: true, data: donations });
  } catch (error) {
    console.log("Error fetching donations:", error);
    return c.json({ success: false, error: "Failed to fetch donations" }, 500);
  }
});

// Create donation
app.post("/make-server-fb96ca04/donations", async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const donationData = {
      id,
      ...body,
      status: 'Pending',
      submittedDate: new Date().toISOString(),
    };
    await kv.set(`donation:${id}`, donationData);
    return c.json({ success: true, data: donationData });
  } catch (error) {
    console.log("Error creating donation:", error);
    return c.json({ success: false, error: "Failed to create donation" }, 500);
  }
});

// Verify donation
app.post("/make-server-fb96ca04/donations/:id/verify", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const donation = await kv.get(`donation:${id}`);
    if (!donation) {
      return c.json({ success: false, error: "Donation not found" }, 404);
    }

    const updated = {
      ...donation,
      status: 'Verified',
      verifiedAt: new Date().toISOString(),
      verifiedBy: body.verifiedBy,
    };

    await kv.set(`donation:${id}`, updated);

    // Log audit trail
    await logAudit({
      action: "Verified Donation",
      details: `Verified donation #${id} from ${donation.donorName} (₱${donation.amount})`,
      userId: body.userId || "admin",
      module: "Donations",
    });

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error verifying donation:", error);
    return c.json({ success: false, error: "Failed to verify donation" }, 500);
  }
});

// ========================================
// EVENTS ROUTES
// ========================================

// Get all events
app.get("/make-server-fb96ca04/events", async (c) => {
  try {
    const events = await kv.getByPrefix("event:");
    return c.json({ success: true, data: events });
  } catch (error) {
    console.log("Error fetching events:", error);
    return c.json({ success: false, error: "Failed to fetch events" }, 500);
  }
});

// Create event
app.post("/make-server-fb96ca04/events", async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const eventData = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      registrations: [],
    };
    await kv.set(`event:${id}`, eventData);

    // Log audit trail
    await logAudit({
      action: "Created Event",
      details: `Published new event: ${body.title}`,
      userId: body.userId || "admin",
      module: "Events",
    });

    return c.json({ success: true, data: eventData });
  } catch (error) {
    console.log("Error creating event:", error);
    return c.json({ success: false, error: "Failed to create event" }, 500);
  }
});

// ========================================
// ANALYTICS ROUTES
// ========================================

// Get population analytics
app.get("/make-server-fb96ca04/analytics/population", async (c) => {
  try {
    const alumni = await kv.getByPrefix("alumni:");

    // Count by department
    const byDepartment = alumni.reduce((acc, alum) => {
      acc[alum.department] = (acc[alum.department] || 0) + 1;
      return acc;
    }, {});

    // Count by program
    const byProgram = alumni.reduce((acc, alum) => {
      acc[alum.program] = (acc[alum.program] || 0) + 1;
      return acc;
    }, {});

    // Count by batch year
    const byBatchYear = alumni.reduce((acc, alum) => {
      acc[alum.batchYear] = (acc[alum.batchYear] || 0) + 1;
      return acc;
    }, {});

    return c.json({
      success: true,
      data: {
        total: alumni.length,
        byDepartment,
        byProgram,
        byBatchYear,
      },
    });
  } catch (error) {
    console.log("Error fetching analytics:", error);
    return c.json({ success: false, error: "Failed to fetch analytics" }, 500);
  }
});

// ========================================
// AUDIT LOGS ROUTES
// ========================================

// Get audit logs
app.get("/make-server-fb96ca04/audit-logs", async (c) => {
  try {
    const logs = await kv.getByPrefix("audit:");
    // Sort by timestamp descending
    const sorted = logs.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return c.json({ success: true, data: sorted });
  } catch (error) {
    console.log("Error fetching audit logs:", error);
    return c.json({ success: false, error: "Failed to fetch audit logs" }, 500);
  }
});

// Helper function to log audit trail (RA 10175 compliant)
async function logAudit({ action, details, userId, module, severity = 'Medium' }) {
  try {
    const id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const auditLog = {
      id,
      timestamp: new Date().toISOString(),
      action,
      details,
      userId,
      module,
      severity,
      ipAddress: 'N/A', // In production, extract from request headers
    };
    await kv.set(`audit:${id}`, auditLog);
  } catch (error) {
    console.log("Error logging audit:", error);
  }
}

Deno.serve(app.fetch);