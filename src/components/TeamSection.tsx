import React, { useEffect, useState } from "react";
import { getAllTeams } from "../services/teamService";
import TeamMemberModal from "./modals/TeamMemberModal";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  designation: string | null;
  description: string | null;
  images: string[];
  visibility: boolean;
  type: "founder" | "advisor";
};

const TeamSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "founder" | "advisor">("all");
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const getTeamMember = async () => {
      try {
        const response = await getAllTeams();
        const members = response.data.data;

        const visibleMembers = members
          .filter((member: any) => member.visibility)
          .map((member: any) => ({
            id: member.id,
            name: member.name,
            role: member.designation || "Founder",
            images: member.images,
            visibility: member.visibility,
            type: member.role === "founder" ? "founder" : "advisor",
            description: member.description || "",
          }));

        setTeamData(visibleMembers);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    getTeamMember();
  }, []);

  const filteredTeam = teamData.filter((member) => {
    if (filter === "all") return true;
    return member.type === filter;
  });

  // Function to truncate description
  const truncateDescription = (text: string | null, maxLength: number = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div className="font-rethink px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-4xl font-medium text-center">
        Meet the <span className="text-green-600 font-bold">team</span> that
        protects <br /> the planet
      </h2>
      <p className="text-center text-gray-600 mt-2 mb-6">
        Meet our dedicated team safeguarding nature through science, education,
        and conservation.
      </p>

      <div className="flex justify-start gap-4 mb-8">
        {["all", "founder", "advisor"].map((type) => (
          <button
            key={type}
            className={`border-[1.5px] px-4 py-1 rounded-full ${
              filter === type
                ? "bg-black text-white"
                : "bg-white text-black border-black"
            }`}
            onClick={() => setFilter(type as "all" | "founder" | "advisor")}
          >
            {type === "all"
              ? "View All"
              : type === "founder"
              ? "Founder's"
              : "Board of Advisors"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTeam.map((member) => (
          <div 
            key={member.id} 
            className="overflow-hidden relative cursor-pointer hover:scale-[1.02] transition-transform duration-200"
            onClick={() => setSelectedMember(member)}
          >
            <div className="relative w-full h-72 flex justify-center items-center">
              <img
                src={
                  member.images.length > 0
                    ? member.images[0]
                    : "/images/default-avatar.jpg"
                }
                alt={member.name}
                className="w-3/4 h-full object-cover border-[1.4px] border-black rounded-xl"
              />
              <div className="absolute bottom-0 w-3/4 mb-5">
                <div className="bg-black/50 text-white text-center py-2 mx-4 rounded-2xl">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm">{member.role}</p>
                  {member.description && (
                    <p className="text-xs overflow-hidden text-gray-300 mt-1 px-2 line-clamp-2">
                      {truncateDescription(member.description, 60)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TeamMemberModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </div>
  );
};

export default TeamSection;