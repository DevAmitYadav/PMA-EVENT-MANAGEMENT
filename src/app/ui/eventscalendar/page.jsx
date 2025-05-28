"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"; // Import the plugin
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBirthdayCake,
  FaRing,
  FaBriefcase,
  FaSpinner,
  FaCalendarPlus,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

dayjs.extend(utc);
dayjs.extend(isSameOrAfter); // Extend dayjs with the plugin

const typeIcons = {
  "wedding event": <FaRing className="text-pink-400 mr-2" />,
  birthday: <FaBirthdayCake className="text-yellow-400 mr-2" />,
  corporate: <FaBriefcase className="text-blue-400 mr-2" />,
};

const eventTypeOptions = [
  { value: "all", label: "All Events" },
  { value: "wedding event", label: "Weddings" },
  { value: "birthday event", label: "Birthdays" },
  { value: "corporate event", label: "Corporate" },
];

const CalendarHeader = ({ currentDate, onMonthChange }) => {
  const handlePreviousMonth = useCallback(() => {
    onMonthChange(-1);
  }, [onMonthChange]);

  const handleNextMonth = useCallback(() => {
    onMonthChange(1);
  }, [onMonthChange]);

  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        onClick={handlePreviousMonth}
        aria-label="Previous Month"
        className="transition-colors duration-200 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
      >
        <FaChevronLeft size={20} />
      </button>
      <h3 className="text-lg font-semibold" aria-live="polite">
        {currentDate.format("MMMM YYYY")}
      </h3>
      <button
        onClick={handleNextMonth}
        aria-label="Next Month"
        className="transition-colors duration-200 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

const EventList = ({
  events,
  selectedDate,
  eventFilter,
  typeIcons,
  onBookEvent,
  onEventClick,
  loading,
}) => {
  const key = selectedDate.format("YYYY-MM-DD");

  const filteredEvents = useMemo(() => {
    if (eventFilter === "all") {
      return events[key] || [];
    } else {
      return (events[key] || []).filter((event) => event.type === eventFilter);
    }
  }, [events, key, eventFilter]);

  const isTodayOrFutureDate = selectedDate.isSameOrAfter(dayjs(), "day");

  if (loading) {
    return (
      <p className="mt-4 text-center text-gray-400 italic" role="status">
        <FaSpinner className="animate-spin inline-block mr-2" />
        Loading events...
      </p>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="mt-4 text-center">
        <p className="text-gray-400 italic">
          No events scheduled for this date.
        </p>
        {isTodayOrFutureDate && (
          <div className="mt-6">
            <BookEventButton onBookEvent={onBookEvent} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      {isTodayOrFutureDate && (
        <div className="flex justify-end">
          <BookEventButton onBookEvent={onBookEvent} />
        </div>
      )}
      <div className="mt-4 grid gap-4" role="list">
        {filteredEvents.map((event, idx) => (
          <article
            key={event.id || idx}
            className="flex items-center p-4 rounded-lg shadow-lg backdrop-blur-md bg-white/10 transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
            role="listitem"
            tabIndex={0}
            aria-label={`${event.type} event: ${event.title}`}
            onClick={() => onEventClick(event)} // Open modal on click
          >
            <Image
              src={
                event.image?.startsWith("http")
                  ? event.image
                  : `/frontend/images/fallback.jpg`
              }
              alt={event.title}
              width={64}
              height={64}
              className="mr-4 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "/frontend/images/fallback.jpg";
              }}
            />
            <div>
              <div className="mb-1 flex items-center text-lg font-semibold">
                {typeIcons[event.type]}
                {event.title}
              </div>
              <p className="text-sm capitalize text-gray-300">{event.type}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const BookEventButton = ({ onBookEvent }) => {
  const [navLoading, setNavLoading] = useState(false);

  const handleBookEvent = useCallback(
    (e) => {
      e.preventDefault();
      setNavLoading(true);
      onBookEvent().finally(() => setNavLoading(false)); // Reset loading state after navigation
    },
    [onBookEvent]
  );

  return navLoading ? (
    <button
      disabled
      className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-yellow-600 text-white font-medium text-base cursor-not-allowed shadow-md"
    >
      <FaSpinner className="animate-spin mr-2" />
      Loading...
    </button>
  ) : (
    <button
      onClick={handleBookEvent}
      className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md"
    >
      <FaCalendarPlus className="mr-2" />
      Book Event
    </button>
  );
};

const EventModal = ({ isOpen, onClose, event, typeIcons }) => {
  // 💡 Assign color based on event type for consistency
  const colorMap = useMemo(() => {
    return {
      Conference: "bg-blue-100 text-blue-800",
      Meeting: "bg-green-100 text-green-800",
      Workshop: "bg-yellow-100 text-yellow-800",
      Webinar: "bg-purple-100 text-purple-800",
      Training: "bg-pink-100 text-pink-800",
      Other: "bg-gray-100 text-gray-800",
    };
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  // Fallback color if event type is unknown
  const eventColor = colorMap[event.type] || "bg-gray-100 text-gray-800";

  const fields = [
    { label: "Type", value: event.type },
    { label: "Date", value: dayjs(event.date).format("MMMM D, YYYY h:mm A") },
    {
      label: "Description",
      value: event.description || "No description provided.",
    },
    {
      label: "Created",
      value: dayjs(event.createdAt).format("MMMM D, YYYY h:mm A"),
    },
    {
      label: "Updated",
      value: dayjs(event.updatedAt).format("MMMM D, YYYY h:mm A"),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4"
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition z-10"
            aria-label="Close Modal"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Modal Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ▶ Image + Title Section */}
            <div className="relative p-5 md:p-6 bg-gray-50 border-r border-gray-200 flex flex-col gap-4">
              <Image
                src={
                  event.image?.startsWith("http")
                    ? event.image
                    : `/frontend/images/fallback.jpg`
                }
                alt={event.title}
                width={500}
                height={400}
                className="rounded-lg object-cover h-64 md:h-80 w-full shadow-sm"
              />
              <div>
                <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                  {typeIcons[event.type]} {event.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {event.type}
                </p>
              </div>
            </div>

            {/* 📋 Info Section */}
            <div className="p-6 space-y-4 bg-white">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`rounded-md px-4 py-3 ${eventColor} shadow-sm transition-all`}
                >
                  <p className="text-xs uppercase font-semibold opacity-70 tracking-wider">
                    {field.label}
                  </p>
                  <p className="mt-1 text-sm">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const EnhancedEventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal
  const router = useRouter();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) {
          throw new Error(
            `Failed to fetch events: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        const eventsMap = data.events.reduce((acc, event) => {
          const key = dayjs.utc(event.date).format("YYYY-MM-DD");
          if (!acc[key]) acc[key] = [];
          acc[key].push(event);
          return acc;
        }, {});
        setEvents(eventsMap);
      } catch (err) {
        setError("Error fetching events: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const calendarDays = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = endOfMonth.date();
    const startIndex = startOfMonth.day();
    const daysArray = [];

    for (let i = 0; i < startIndex; i++) {
      daysArray.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      daysArray.push(dayjs(currentDate).date(d));
    }
    return daysArray;
  }, [currentDate]);

  const handleMonthChange = useCallback((offset) => {
    setCurrentDate((prev) => prev.add(offset, "month"));
  }, []);

  const handleDateSelect = useCallback((date) => {
    if (date) {
      setSelectedDate(date);
      setEventFilter("all"); // Reset filter on new date selection
    }
  }, []);

  const handleBookEvent = useCallback(async () => {
    return router.push("/ui/eventform");
  }, [router]);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  return (
    <main className="min-h-screen py-10 px-4 bg-gradient-to-b from-[#0B2340] to-[#0A153B] text-white font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <p className="tracking-wide text-sm font-semibold uppercase">
            Elegant Moments
          </p>
          <h2 className="mt-2 text-4xl font-bold">Event Calendar</h2>
          <p className="mt-2 max-w-md mx-auto text-gray-300">
            Browse your special moments by selecting a date on the calendar.
          </p>
        </header>

        {error && (
          <p className="mb-4 text-center text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Calendar Section */}
          <section className="w-full md:w-1/3 rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-md">
            <CalendarHeader
              currentDate={currentDate}
              onMonthChange={handleMonthChange}
            />

            <div className="mb-1 grid grid-cols-7 gap-1 text-sm font-medium text-gray-300">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                <div key={idx} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1" role="grid">
              {calendarDays.map((day, i) => {
                const isSelected = day && day.isSame(selectedDate, "day");
                const isToday = day && day.isSame(dayjs(), "day");
                const key = day ? day.format("YYYY-MM-DD") : null;
                const eventCount = key ? events[key]?.length : 0;

                return (
                  <div
                    key={i}
                    onClick={() => day && handleDateSelect(day)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && day && handleDateSelect(day)
                    }
                    tabIndex={day ? 0 : -1}
                    role="gridcell"
                    aria-label={`Day ${day ? day.date() : ""} with ${eventCount || 0} events`}
                    className={`cursor-pointer py-2 text-center text-sm rounded transition-all duration-200 relative ${
                      !day ? "opacity-0" : "hover:bg-yellow-700"
                    } ${isToday ? "bg-yellow-500 text-black" : ""} ${
                      eventCount ? "border-2 border-yellow-400" : ""
                    } ${isSelected ? "bg-yellow-600 text-white" : ""}`}
                  >
                    {day ? day.date() : ""}
                    {eventCount > 0 && (
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-yellow-400 px-1 text-[10px] text-black">
                        {eventCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-3 flex items-center gap-1 text-xs text-yellow-400">
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              Dates with events
            </p>
          </section>

          {/* Events Section */}
          <section className="w-full md:w-2/3 rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-md">
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-lg font-semibold">
                Events on {selectedDate.format("MMMM D, YYYY")}
              </h3>

              {/* ▼ Filter Dropdown */}
              <div className="text-sm flex items-center">
                <label
                  htmlFor="eventFilter"
                  className="mr-2 text-gray-300 font-medium flex items-center"
                >
                  <FaFilter className="mr-1" />
                  Filter:
                </label>
                <div className="relative">
                  <select
                    id="eventFilter"
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="appearance-none bg-white text-gray-700 border border-gray-300 px-3 py-1 rounded leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 pr-8" // Modern UI dropdown
                  >
                    {eventTypeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="text-black"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current text-gray-700"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <EventList
              events={events}
              selectedDate={selectedDate}
              eventFilter={eventFilter}
              typeIcons={typeIcons}
              onBookEvent={handleBookEvent}
              onEventClick={handleEventClick}
              loading={loading}
            />
          </section>
        </div>
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
          typeIcons={typeIcons}
        />
      </div>
    </main>
  );
};

export default EnhancedEventCalendar;
