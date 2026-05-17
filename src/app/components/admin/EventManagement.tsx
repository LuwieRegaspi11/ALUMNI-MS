import React, { useState } from 'react';
import { Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tabs, Tab, Box } from '@mui/material';
import { Calendar, Plus, MapPin, Users, Clock, Search, Upload, X } from 'lucide-react';
import EventCalendar from '../shared/EventCalendar';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  registeredCount: number;
  maxCapacity?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  imageUrl?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Alumni Homecoming 2026',
    description: 'Annual gathering of all Asian College alumni. Reconnect, network, and celebrate together.',
    date: '2026-07-15',
    time: '14:00',
    location: 'Asian College Main Campus',
    targetAudience: 'All Alumni',
    registeredCount: 234,
    maxCapacity: 500,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
  },
  {
    id: '2',
    title: 'CSE Tech Summit',
    description: 'Technology trends and career opportunities in the IT industry.',
    date: '2026-06-10',
    time: '09:00',
    location: 'Computer Science Building, Room 301',
    targetAudience: 'CSE Alumni',
    registeredCount: 87,
    maxCapacity: 150,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: '3',
    title: 'CTHM Industry Networking Night',
    description: 'Connect with hospitality industry leaders and explore career opportunities.',
    date: '2026-06-20',
    time: '18:00',
    location: 'Grand Hotel Ballroom',
    targetAudience: 'CTHM Alumni',
    registeredCount: 56,
    maxCapacity: 100,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'
  },
  {
    id: '4',
    title: 'Career Fair 2026',
    description: 'Meet with top employers and explore job opportunities.',
    date: '2026-05-25',
    time: '10:00',
    location: 'Campus Gymnasium',
    targetAudience: 'All Alumni',
    registeredCount: 312,
    status: 'Completed'
  }
];

export default function EventManagement() {
  const [events] = useState<Event[]>(mockEvents);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [eventImage, setEventImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
    setEventImage(null);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(e => e.status === 'Upcoming');
  const completedEvents = filteredEvents.filter(e => e.status === 'Completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Event Management</h2>
          <p className="text-gray-600">Schedule and manage alumni events</p>
        </div>
        <Button
          variant="contained"
          startIcon={<Plus className="w-4 h-4" />}
          className="bg-blue-600"
          onClick={() => setCreateDialogOpen(true)}
        >
          Create Event
        </Button>
      </div>

      {/* View Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="Calendar View" />
            <Tab label="Management View" />
          </Tabs>
        </Box>
      </Card>

      {/* Calendar View */}
      {currentTab === 0 && (
        <EventCalendar userRole="admin" />
      )}

      {/* Management View */}
      {currentTab === 1 && (
        <>
          {/* Search Bar */}
          <Card>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Search events by title, description, location, or audience..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
                }}
              />
            </CardContent>
          </Card>

      {/* Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Upcoming Events</span>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl">{upcomingEvents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Registrations</span>
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl">{events.reduce((sum, e) => sum + e.registeredCount, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Events This Year</span>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl">{events.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg mb-4">Upcoming Events ({upcomingEvents.length})</h3>
        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No upcoming events found matching your search</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
              setSelectedEvent(event);
              setViewDialogOpen(true);
            }}>
              <CardContent>
                {event.imageUrl && (
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg">{event.title}</h4>
                  <Chip label={event.status} size="small" color="primary" />
                </div>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>
                      {event.registeredCount} registered
                      {event.maxCapacity && ` / ${event.maxCapacity} max`}
                    </span>
                  </div>
                </div>
                {event.maxCapacity && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-gray-600">Registration Progress</span>
                      <span>{Math.round((event.registeredCount / event.maxCapacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((event.registeredCount / event.maxCapacity) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div>
        <h3 className="text-lg mb-4">Past Events</h3>
        <div className="space-y-3">
          {completedEvents.map((event) => (
            <Card key={event.id}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4>{event.title}</h4>
                      <Chip label={event.status} size="small" color="default" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.registeredCount} attended
                      </span>
                    </div>
                  </div>
                  <Button variant="outlined" size="small">View Report</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

        </>
      )}

      {/* Create Event Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCreateDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField fullWidth label="Event Title" />
            <TextField fullWidth label="Description" multiline rows={3} />

            {/* Image Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-sm mb-2">Event Image</p>
              {eventImage ? (
                <div className="relative">
                  <img
                    src={eventImage}
                    alt="Event preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setEventImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload event banner or promotional image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="event-image-upload"
                  />
                  <label htmlFor="event-image-upload">
                    <Button variant="outlined" component="span" size="small">
                      Choose Image
                    </Button>
                  </label>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Time" type="time" InputLabelProps={{ shrink: true }} />
            </div>
            <TextField fullWidth label="Location" />
            <TextField fullWidth label="Target Audience" />
            <TextField fullWidth label="Max Capacity" type="number" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>Cancel</Button>
          <Button variant="contained" className="bg-blue-600">Create Event</Button>
        </DialogActions>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div className="space-y-4 pt-4">
              {selectedEvent.imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p>{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p>{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Target Audience</p>
                  <p>{selectedEvent.targetAudience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registered</p>
                  <p>{selectedEvent.registeredCount}{selectedEvent.maxCapacity && ` / ${selectedEvent.maxCapacity}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Chip label={selectedEvent.status} size="small" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button variant="outlined">Edit Event</Button>
          <Button variant="contained" color="error">Cancel Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
