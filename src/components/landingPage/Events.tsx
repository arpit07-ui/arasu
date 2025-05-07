import { useEffect, useState } from "react";
import { EventItem } from "../../types/homeType";
import EventImageSlider from "../EventImageSlider";
import { getAllEvents } from "../../services/eventsService";
import EventModal from "../modals/EventModal";

const Events = ({ setHomeContent }: any) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "upcoming" | "latest">(
    "all"
  );
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const time = timeStr || "00:00:00";

    const formattedDate = date.toDateString();
    const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    return `${formattedDate} at ${formattedTime}`;
  };

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      const data = response.data;

      const mappedEvents = data
        .filter((event: any) => event.visibility)
        .map((event: any) => ({
          id: event.id,
          images: event.images.length
            ? event.images
            : [
                "https://dummyimage.com/300x200/cccccc/969696.png&text=No+Image",
              ],
          category: "Biodiversity",
          title: event.title,
          description: event.description,
          longDescription: event.longDescription || event.description,
          location: event.location,
          mapLocation: encodeURIComponent(event.location),
          googleMap: event.googleMap,
          dateTime: formatDateTime(event.eventDate, event.eventTime),
          address: event.mapUrl || "",
          contactInfo: event.contactInfo || "N/A",
          registrationLink: event.registrationLink || "",
        }));

      setEvents(mappedEvents);
      return mappedEvents;
    } catch (err) {
      console.error("Error fetching events:", err);
      return [];
    }
  };

  useEffect(() => {
    setHomeContent({
      title: "Protecting Biodiversity, Sustaining Life",
      description:
        "Arasu Biodiversity Foundation is a non-profit organization registered under Section 8 of the Companies Act, 2013, working and functioning towards commitment and involvement in implementing environment and rural development initiatives and enhancing",
      heroImage: "",
      ctaText: "Explore Projects",
      aboutUsTitle: "",
      aboutUsDescription: "",
    });

    fetchEvents();
  }, []);

  const parseDate = (dateTimeStr: string): Date => {
    const parts = dateTimeStr.split(" at ")[0];
    return new Date(parts);
  };

  const getUpcomingEvents = async () => {
    const res = await fetchEvents();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setEvents(
      res.filter((event: any) => {
        const eventDate = parseDate(event.dateTime);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate > tomorrow;
      })
    );
  };

  const getLatestEvents = async () => {
    const res = await fetchEvents();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setEvents(
      res.filter((event: any) => {
        const eventDate = parseDate(event.dateTime);
        eventDate.setHours(0, 0, 0, 0);
        return (
          eventDate.getTime() === today.getTime() ||
          eventDate.getTime() === tomorrow.getTime()
        );
      })
    );
  };

  const openModal = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section className="font-rethink bg-white py-4 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 text-black">
          Our Upcoming Events!
        </h2>

        <div className="flex justify-start gap-4 mb-8 flex-wrap">
          <button
            onClick={() => {
              fetchEvents();
              setFilterType("all");
            }}
            className={`px-4 py-1.5 border border-black rounded-full text-sm font-medium ${
              filterType === "all"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            } transition`}
          >
            All Events
          </button>
          <button
            onClick={() => {
              getUpcomingEvents();
              setFilterType("upcoming");
            }}
            className={`px-4 py-1.5 border border-black rounded-full text-sm font-medium ${
              filterType === "upcoming"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            } transition`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => {
              getLatestEvents();
              setFilterType("latest");
            }}
            className={`px-4 py-1.5 border border-black rounded-full text-sm font-medium ${
              filterType === "latest"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            } transition`}
          >
            Latest Event
          </button>
        </div>

        <div className="grid gap-8 ">
          {events?.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No events...</p>
          ) : (
            events?.map((event, index) => {
              
              return (
                <div key={event?.id || index} className="relative z-0">
                  {index === events.length - 1 && (
                    <div className="absolute inset-0 top-5 left-[15%] w-[70%] md:h-[103%] bg-[#4E9F3D61] rounded-3xl z-0" />
                  )}

                  <div className="relative z-10 flex flex-col md:flex-row items-start p-3 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden">
                    <EventImageSlider images={event.images} />

                    <div className="p-4 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <span className="inline-block mb-1 px-3 py-0.5 border border-black bg-[#F1F1F1] rounded-full text-xs text-black">
                          {event.category}
                        </span>
                        <h3 className="text-lg font-semibold mb-1 text-black">
                          {event.title}
                        </h3>
                        <p className="text-sm w-auto text-gray-700 mb-2">
                          {event.description}
                        </p>
                        <div className="flex gap-16 text-xs text-gray-600 mb-2">
                          <div>
                            <strong>Location</strong>
                            <br />
                            {event.location}
                          </div>
                          <div>
                            <strong>Date & Time</strong>
                            <br />
                            {event.dateTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-4 md:mt-0 md:self-center">
                        <button
                          onClick={() => window.open(`${event?.googleMap}`)}
                          className="px-3 py-1 bg-black text-white text-sm rounded-full whitespace-nowrap"
                        >
                          View Location
                        </button>
                        <button
                          onClick={() => openModal(event)}
                          className="px-3 py-1 text-black text-sm font-semibold rounded-full whitespace-nowrap"
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {isModalOpen && selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal} />
      )}
    </>
  );
};

export default Events;
