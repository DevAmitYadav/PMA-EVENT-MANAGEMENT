"use client";
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FaChevronLeft, FaChevronRight, FaBirthdayCake, FaRing, FaBriefcase } from 'react-icons/fa';

const sampleEvents = {
  '2025-05-10': [
    { title: 'Johnson Wedding', type: 'wedding', image: '/images/wedding.jpg' }
  ],
  '2025-05-15': [
    { title: 'Sophia’s Birthday Bash', type: 'birthday', image: '/images/birthday.jpg' }
  ],
  '2025-05-21': [
    { title: 'TechCorp Annual Meetup', type: 'corporate', image: '/images/corporate.jpg' }
  ],
};

const typeIcons = {
  wedding: <FaRing className="text-pink-400 mr-2" />,
  birthday: <FaBirthdayCake className="text-yellow-400 mr-2" />,
  corporate: <FaBriefcase className="text-blue-400 mr-2" />,
};

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [calendarDays, setCalendarDays] = useState([]);
  const [events, setEvents] = useState({});

  useEffect(() => {
    setEvents(sampleEvents); // Replace this with fetch() to API in production
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const start = currentDate.startOf('month');
    const end = currentDate.endOf('month');
    const offset = start.day();
    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    for (let d = 1; d <= end.date(); d++) {
      days.push(currentDate.date(d));
    }

    setCalendarDays(days);
  };

  const handleMonthChange = (offset) => {
    setCurrentDate(currentDate.add(offset, 'month'));
  };

  const handleDateSelect = (date) => {
    if (date) setSelectedDate(date);
  };

  const renderEvents = () => {
    const key = selectedDate.format('YYYY-MM-DD');
    const items = events[key] || [];

    if (items.length === 0) {
      return <p className="text-center text-gray-400 italic mt-4">No events scheduled for this date.</p>;
    }

    return (
      <div className="grid gap-4 mt-4">
        {items.map((event, idx) => (
          <div key={idx} className="flex items-center bg-white/5 backdrop-blur-md rounded-lg shadow p-4 text-white">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-16 h-16 object-cover rounded-md mr-4" 
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/fallback.jpg'; }} 
            />
            <div>
              <div className="flex items-center text-lg font-semibold">
                {typeIcons[event.type]}
                {event.title}
              </div>
              <p className="text-sm capitalize mt-1 text-gray-300">{event.type} event</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const hasEvents = (date) => {
    if (!date) return false;
    return events[date.format('YYYY-MM-DD')];
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-[#0B2340] text-white font-serif">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#fcd34d] uppercase tracking-wider text-sm">Elegant Moments</p>
          <h2 className="text-4xl font-bold">Event Calendar</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">Browse your special moments by selecting a date on the calendar.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Calendar */}
          <div className="bg-white/5 rounded-lg p-6 w-full md:w-1/3 shadow-lg backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => handleMonthChange(-1)}><FaChevronLeft /></button>
              <h3 className="font-semibold">{currentDate.format('MMMM YYYY')}</h3>
              <button onClick={() => handleMonthChange(1)}><FaChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm text-gray-300 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => {
                const isSelected = d && d.isSame(selectedDate, 'day');
                const isToday = d && d.isSame(dayjs(), 'day');
                const eventDay = hasEvents(d);

                return (
                  <div
                    key={i}
                    onClick={() => handleDateSelect(d)}
                    className={`text-center text-sm py-1 rounded cursor-pointer
                      ${!d ? 'opacity-0' : ''}
                      ${isToday ? 'bg-yellow-500 text-black' : ''}
                      ${eventDay ? 'border border-yellow-400' : ''}
                      ${isSelected ? 'bg-yellow-600 text-white' : ''}`}
                  >
                    {d ? d.date() : ''}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-yellow-400 mt-3 flex items-center gap-1">
              ● Dates with events
            </p>
          </div>

          {/* Events Section */}
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold mb-2">
              Events on {selectedDate.format('MMMM D, YYYY')}
            </h3>
            {renderEvents()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;