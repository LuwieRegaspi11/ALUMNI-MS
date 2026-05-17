import React, { useState } from 'react';
import { Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  registeredCount?: number;
  maxCapacity?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  imageUrl?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Alumni Homecoming 2026',
    description: 'Annual gathering of all Asian College alumni.',
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
    description: 'Technology trends and career opportunities.',
    date: '2026-06-10',
    time: '09:00',
    location: 'Computer Science Building',
    targetAudience: 'CSE Alumni',
    registeredCount: 87,
    maxCapacity: 150,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: '3',
    title: 'CTHM Industry Networking',
    description: 'Connect with hospitality industry leaders.',
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
    title: 'Scholarship Awards Ceremony',
    description: 'Recognition of outstanding alumni donors.',
    date: '2026-05-30',
    time: '16:00',
    location: 'University Auditorium',
    targetAudience: 'All Alumni',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80'
  },
  {
    id: '5',
    title: 'BAA Alumni Meetup',
    description: 'Networking event for Business Administration alumni.',
    date: '2026-06-05',
    time: '19:00',
    location: 'Business Center',
    targetAudience: 'BAA Alumni',
    status: 'Upcoming'
  }
];

interface EventCalendarProps {
  userRole?: 'admin' | 'alumni' | 'faculty';
}

// Color coding for different event types
const eventColors: Record<string, { bg: string; text: string; border: string }> = {
  'All Alumni': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'CSE Alumni': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  'CTHM Alumni': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'BAA Alumni': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  'default': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
};

const getEventColor = (targetAudience: string) => {
  return eventColors[targetAudience] || eventColors['default'];
};

export default function EventCalendar({ userRole = 'alumni' }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.filter(event => event.date === dateStr);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDayOfMonth + 1;
      const isCurrentMonth = day > 0 && day <= daysInMonth;
      const events = isCurrentMonth ? getEventsForDate(day) : [];
      const isToday = isCurrentMonth &&
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <div
          key={i}
          className={`min-h-24 border border-gray-200 p-2 ${
            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
        >
          {isCurrentMonth && (
            <>
              <div className={`text-sm mb-1 ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                {day}
              </div>
              <div className="space-y-1">
                {events.map((event, idx) => {
                  const colors = getEventColor(event.targetAudience);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleEventClick(event)}
                      className={`text-xs ${colors.bg} ${colors.text} px-1.5 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity truncate border-l-2 ${colors.border}`}
                    >
                      {event.time.substring(0, 5)} {event.title}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                size="small"
                onClick={previousMonth}
                startIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={nextMonth}
                endIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-100 border border-gray-200 p-2 text-center text-sm font-semibold">
                {day}
              </div>
            ))}
            {/* Calendar Days */}
            {renderCalendarDays()}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-600 mb-2">Legend:</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border-2 border-blue-500 rounded"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border-l-2 border-blue-300 rounded"></div>
                <span>All Alumni</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-100 border-l-2 border-purple-300 rounded"></div>
                <span>CSE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border-l-2 border-green-300 rounded"></div>
                <span>CTHM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-100 border-l-2 border-orange-300 rounded"></div>
                <span>BAA</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events List */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-3">Upcoming Events This Month</h3>
          {mockEvents
            .filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.getMonth() === month && eventDate.getFullYear() === year;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events scheduled for this month</p>
          ) : (
            <div className="space-y-2">
              {mockEvents
                .filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.getMonth() === month && eventDate.getFullYear() === year;
                })
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event) => {
                  const colors = getEventColor(event.targetAudience);
                  return (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`border-l-4 ${colors.border} rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{event.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          </div>
                        </div>
                        <Chip
                          label={event.targetAudience}
                          size="small"
                          className={`${colors.bg} ${colors.text}`}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Detail Dialog */}
      <Dialog open={eventDialogOpen} onClose={() => setEventDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="flex items-center gap-3">
            {selectedEvent && (
              <>
                <div className={`w-1 h-12 rounded ${getEventColor(selectedEvent.targetAudience).border.replace('border-', 'bg-')}`}></div>
                <span>Event Details</span>
              </>
            )}
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div className="space-y-4 pt-2">
              {selectedEvent.imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
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
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.registeredCount !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>
                      {selectedEvent.registeredCount} registered
                      {selectedEvent.maxCapacity && ` / ${selectedEvent.maxCapacity} max`}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <Chip
                  label={selectedEvent.targetAudience}
                  size="small"
                  className={`${getEventColor(selectedEvent.targetAudience).bg} ${getEventColor(selectedEvent.targetAudience).text}`}
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEventDialogOpen(false)}>Close</Button>
          {userRole === 'alumni' && (
            <Button variant="contained" className="bg-blue-600">
              Register for Event
            </Button>
          )}
          {userRole === 'admin' && (
            <Button variant="outlined">
              Edit Event
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
