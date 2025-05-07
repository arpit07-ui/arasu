import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";
import { AddEventModal } from "./modals/AddEventModal";
import {
  deleteAllEvents,
  deleteEvent,
  getAllEvents,
  updateEvents,
} from "../../../services/eventsService";
import { Trash2 } from "lucide-react";
import { EditEventModal } from "./modals/EditEventModal";
import toast from "react-hot-toast";
import { DeleteModal } from "./modals/DeleteModal";

interface Event {
  id: number;
  srNo: string;
  title: string;
  occasion: string;
  description: string;
  location: string;
  dateTime: string;
  visibility: boolean;
  selected?: boolean;
  visible?: boolean;
}

const Event: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Event | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllEvents();
      const items = res.data?.map((item: any) => {
        // Format the event date
        const formattedDate = item.eventDate
          ? new Date(item.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "No date specified";

        // Format the event time if it exists
        const formattedTime = item.eventTime
          ? new Date(`1970-01-01T${item.eventTime}`).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            )
          : "No time specified";

        return {
          ...item,
          formattedDate, // Add the formatted date
          formattedTime, // Add the formatted time
          date: formattedDate, // Keep for backward compatibility if needed
          time: formattedTime, // Add time field
        };
      });
      setEvents(items);
    };
    fetchBlogs();
  }, [isAddModalOpen]);

  const upadteCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = events.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setEvents(updatedCheckbox);
  };

  const updateCheck = (event: boolean) => {
    const updatedCheck = events.map((prev) => {
      return { ...prev, selected: event };
    });
    setEvents(updatedCheck);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteAll(false);
    setDeleteModalOpen(true);
  };

  const handleDeleteAllClick = () => {
    setDeleteId(null);
    setDeleteAll(true);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteAll) {
        const ids = events.filter((e) => e.selected).map((e) => e.id);
        if (ids.length === 0) {
          toast.error("No events selected");
          return;
        }
        await deleteAllEvents(ids);
        const selectedIdsSet = new Set(ids);
        setEvents((prev) => prev.filter((e) => !selectedIdsSet.has(e.id)));
        toast.success("Selected events deleted!");
      } else if (deleteId !== null) {
        await deleteEvent(deleteId);
        setEvents((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Event deleted!");
      }
    } catch (error) {
      console.error("Error deleting event(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEdit = (member: Event) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const openModal = () => {
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddEvent = (newEvent: Omit<Event, "id" | "srNo" | "visible">) => {
    const newId =
      events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newSrNo = newId.toString().padStart(2, "0");

    const eventToAdd: Event = {
      id: newId,
      srNo: newSrNo,
      ...newEvent,
      visible: true,
    };

    setEvents([...events, eventToAdd]);
    closeModal();
  };

  const handleVisibilityToggle = async (blog: Event) => {
    const updatedBlog = {
      ...blog,
      visibility: !blog.visibility,
    };

    try {
      const res = await updateEvents(updatedBlog);

      // Update local state with new visibility
      const updatedBlogs = events.map((b) =>
        b.id === blog.id ? { ...b, visibility: updatedBlog.visibility } : b
      );

      setEvents(updatedBlogs);
    } catch (error) {
      console.error("Failed to update visibility", error);
    }
  };

  const handleUpdateBlog = (updatedBlog: Event | any) => {
    setEvents((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <FiPlus size={16} />
          <span>Add Events</span>
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-12 px-4 py-3">
                <input
                  onChange={(e) => {
                    updateCheck(e.target.checked);
                  }}
                  type="checkbox"
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Sr.No
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Event Title
              </th>
              {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Event Occasion
              </th> */}
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Event Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Event Date/Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Visibility
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Action
              </th>
              <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">
                <button
                  onClick={() => handleDeleteAllClick()}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={17} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: any, index) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <input
                    onChange={(e) => upadteCheckbox(event.id, e.target.checked)}
                    checked={Boolean(event.selected)}
                    type="checkbox"
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{event.title}</td>
                {/* <td className="px-4 py-3 text-sm">{event.occasion}</td> */}
                <td className="p-2 sm:p-3">
                  <div
                    className="max-w-[100px] sm:max-w-[200px] truncate cursor-pointer text-xs sm:text-sm"
                    title={event.description}
                  >
                    {event.description}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{event.location}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span>{event.formattedDate}</span>
                    <span className="text-xs text-gray-500">
                      {event.formattedTime || "No time specified"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={event.visibility}
                      onChange={() => handleVisibilityToggle(event)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <button
                    onClick={(e) => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={17} />
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddEventModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEvent}
          eventsLength={events.length}
        />
      )}

      {isEditModalOpen && currentMember && (
        <EditEventModal
          eventData={currentMember}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateBlog}
        />
      )}

      {/* Delete modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        description={
          deleteAll
            ? "Are you sure you want to delete selected events?"
            : "Are you sure you want to delete this event?"
        }
      />
    </div>
  );
};

export default Event;
