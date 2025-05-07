import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getAllEvents } from "../../../services/eventsService";

interface EventType {
  id: string;
  title: string;
  description: string;
  location: string;
  googleMap: string;
  eventDate: string;
  eventTime: string;
  images: string[];
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EventsPieChart() {
  const [eventsData, setEventsData] = useState([
    { name: "Upcoming Events", value: 0, color: "#8884d8" },
    { name: "Completed Events", value: 0, color: "#82ca9d" },
  ]);

  const COLORS = ["#8884d8", "#82ca9d"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const today = new Date();

        const upcomingCount = response.data.filter(
          (event: EventType) => new Date(event.eventDate) > today
        ).length;

        const completedCount = response.data.filter(
          (event: EventType) => new Date(event.eventDate) < today
        ).length;

        setEventsData([
          { name: "Upcoming", value: upcomingCount, color: "#8884d8" },
          { name: "Completed", value: completedCount, color: "#82ca9d" },
        ]);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="h-72 bg-gray-100">
      <h3 className="text-lg text-center mb-4">Events Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={eventsData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {eventsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} events`, "Count"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
