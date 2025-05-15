"use client";
import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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
} from "react-icons/fa";

dayjs.extend(utc);

// Define event type icons with respective accent colors.
const typeIcons = {
  wedding: <FaRing className="text-pink-400 mr-2" />,
  birthday: <FaBirthdayCake className="text-yellow-400 mr-2" />,
  corporate: <FaBriefcase className="text-blue-400 mr-2" />,
};

const EnhancedEventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navLoading, setNavLoading] = useState(false);
  const router = useRouter();

  // Fetch events from API and aggregate them by date.
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
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

  // Use useMemo to re-calc calendar days only when currentDate changes.
  const calendarDays = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = endOfMonth.date();
    const startIndex = startOfMonth.day();
    const daysArray = [];

    // Fill placeholders for days before the month starts.
    for (let i = 0; i < startIndex; i++) {
      daysArray.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      daysArray.push(dayjs(currentDate).date(d));
    }
    return daysArray;
  }, [currentDate]);

  const handleMonthChange = (offset) => {
    setCurrentDate((prev) => prev.add(offset, "month"));
  };

  const handleDateSelect = (date) => {
    if (date) setSelectedDate(date);
  };

  // Navigate to event form with booking icon and spinner feedback.
  const handleBookEvent = (e) => {
    e.preventDefault();
    setNavLoading(true);
    router.push("/ui/eventform");
  };

  // Add button component.
  const renderAddButton = () => {
    return navLoading ? (
      <button
        disabled
        className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-yellow-500 text-white font-medium text-base cursor-not-allowed"
      >
        <FaSpinner className="animate-spin mr-2" />
        Loading...
      </button>
    ) : (
      <button
        onClick={handleBookEvent}
        className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-yellow-500 text-white font-medium text-base hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <FaCalendarPlus className="mr-2" />
        Book Your Event
      </button>
    );
  };

  // Render events for the selected day according to the conditions.
  const renderEvents = () => {
    // Check if the selected date is in the past.
    const isPast = selectedDate.isBefore(dayjs(), "day");
    const key = selectedDate.format("YYYY-MM-DD");
    const items = events[key] || [];

    if (loading) {
      return (
        <p className="mt-4 text-center text-gray-400 italic" role="status">
          <FaSpinner className="animate-spin inline-block mr-2" />
          Loading events...
        </p>
      );
    }

    // For today or future dates:
    if (!isPast) {
      // When there are events scheduled, show the add button at the top.
      if (items.length > 0) {
        return (
          <div className="mt-4">
            <div className="flex justify-end">{renderAddButton()}</div>
            <div className="mt-4 grid gap-4" role="list">
              {items.map((event, idx) => (
                <article
                  key={event.id || idx}
                  className="flex items-center p-4 rounded-lg shadow-lg backdrop-blur-md bg-white/10 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${event.type} event: ${event.title}`}
                >
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={64}
                      height={64}
                      className="mr-4 rounded-md object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/frontend/images/fallback.jpg";
                      }}
                    />
                  ) : (
                    <Image
                      src="/frontend/images/fallback.jpg"
                      alt="Fallback image"
                      width={64}
                      height={64}
                      className="mr-4 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <div className="mb-1 flex items-center text-lg font-semibold">
                      {typeIcons[event.type]}
                      {event.title}
                    </div>
                    <p className="text-sm capitalize text-gray-300">
                      {event.type} event
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      } else {
        // When there are no events scheduled, show the "No events" message and add button below.
        return (
          <div className="mt-4 text-center">
            <p className="text-gray-400 italic">No events scheduled for this date.</p>
            <div className="mt-6">{renderAddButton()}</div>
          </div>
        );
      }
    }

    // For past dates: only show the events or a no-events message.
    return (
      <div className="mt-4 text-center">
        {items.length === 0 ? (
          <p className="text-gray-400 italic">
            No events occurred on this date.
          </p>
        ) : (
          <div className="mt-4 grid gap-4" role="list">
            {items.map((event, idx) => (
              <article
                key={event.id || idx}
                className="flex items-center p-4 rounded-lg shadow-lg backdrop-blur-md bg-white/10 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
                role="listitem"
                tabIndex={0}
                aria-label={`${event.type} event: ${event.title}`}
              >
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={64}
                    height={64}
                    className="mr-4 rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/frontend/images/fallback.jpg";
                    }}
                  />
                ) : (
                  <Image
                    src="/frontend/images/fallback.jpg"
                    alt="Fallback image"
                    width={64}
                    height={64}
                    className="mr-4 rounded-md object-cover"
                  />
                )}
                <div>
                  <div className="mb-1 flex items-center text-lg font-semibold">
                    {typeIcons[event.type]}
                    {event.title}
                  </div>
                  <p className="text-sm capitalize text-gray-300">
                    {event.type} event
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen py-10 px-4 bg-gradient-to-b from-[#0B2340] to-[#0A153B] text-white font-serif">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
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
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => handleMonthChange(-1)}
                aria-label="Previous Month"
                className="transition-colors duration-200 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
              >
                <FaChevronLeft size={20} />
              </button>
              <h3 className="text-lg font-semibold" aria-live="polite">
                {currentDate.format("MMMM YYYY")}
              </h3>
              <button
                onClick={() => handleMonthChange(1)}
                aria-label="Next Month"
                className="transition-colors duration-200 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
              >
                <FaChevronRight size={20} />
              </button>
            </div>

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

          {/* Events Display Section */}
          <section className="w-full md:w-2/3 rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-md">
            <h3 className="mb-4 text-lg font-semibold">
              Events on {selectedDate.format("MMMM D, YYYY")}
            </h3>
            {renderEvents()}
          </section>
        </div>
      </div>
    </main>
  );
};

export default EnhancedEventCalendar;
