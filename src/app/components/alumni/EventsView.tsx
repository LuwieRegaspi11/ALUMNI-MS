import React, { useState } from 'react';
import { Card, CardContent, Button, Chip, TextField, Tabs, Tab, Box } from '@mui/material';
import { Calendar, MapPin, Users, Clock, CheckCircle, Search } from 'lucide-react';
import EventCalendar from '../shared/EventCalendar';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  registered: boolean;
  spotsLeft?: number;
  imageUrl?: string;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Alumni Homecoming 2026',
    description: 'Annual gathering of all Asian College alumni. Reconnect, network, and celebrate together.',
    date: '2026-07-15',
    time: '14:00',
    location: 'Asian College Main Campus',
    targetAudience: 'All Alumni',
    registered: false,
    spotsLeft: 266,
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
    registered: true,
    spotsLeft: 63,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: '3',
    title: 'Career Networking Night',
    description: 'Connect with industry leaders and explore new opportunities.',
    date: '2026-06-25',
    time: '18:00',
    location: 'Grand Hotel Ballroom',
    targetAudience: 'All Alumni',
    registered: false,
    spotsLeft: 42,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'
  }
];

const myRegistrations = upcomingEvents.filter(e => e.registered);

export default function EventsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  const filteredEvents = upcomingEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistrations = myRegistrations.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Events & Calendar</h2>
          <p className="text-gray-600">Stay connected with alumni events and activities</p>
        </div>
      </div>

      {/* View Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="Calendar View" />
            <Tab label="List View" />
          </Tabs>
        </Box>
      </Card>

      {/* Calendar View */}
      {currentTab === 0 && (
        <EventCalendar userRole="alumni" />
      )}

      {/* List View */}
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

      {/* My Registrations */}
      {myRegistrations.length > 0 && (
        <div>
          <h3 className="text-lg mb-4">My Registered Events ({filteredRegistrations.length})</h3>
          {filteredRegistrations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No registered events found matching your search</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRegistrations.map((event) => (
              <Card key={event.id} className="border-l-4 border-l-blue-600">
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
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg">{event.title}</h4>
                        <Chip
                          label="Registered"
                          size="small"
                          color="success"
                          icon={<CheckCircle className="w-3 h-3" />}
                        />
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
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                      <Button variant="outlined" size="small" color="error">
                        Cancel Registration
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg mb-4">Upcoming Events ({filteredEvents.filter(e => !e.registered).length})</h3>
        {filteredEvents.filter(e => !e.registered).length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No upcoming events found matching your search</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents
              .filter(e => !e.registered)
              .map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
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
                  <div className="mb-3">
                    <h4 className="text-lg mb-2">{event.title}</h4>
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
                      {event.spotsLeft && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{event.spotsLeft} spots remaining</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Chip label={event.targetAudience} size="small" variant="outlined" />
                    <Button variant="contained" size="small" className="ml-auto bg-blue-600">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
          </div>
        )}
      </div>

        </>
      )}
    </div>
  );
}
