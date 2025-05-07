import React, { useEffect, useRef, useState } from "react";
import hero from "../../public/assets/hero-images/hero-foundation.svg";
import go from "../../public/assets/icons/go.png";
import { useLocation, useNavigate } from "react-router-dom";
import { HeroContent } from "../types/foundationType";
import MissionVision from "../components/MissionVision";
import Whatsapp from "../components/Whatsapp";
import TeamSection from "../components/TeamSection";

interface Stat {
  label: string;
  value: string;
}

const AboutUs: React.FC = () => {
  const [content, setContent] = useState<HeroContent>({
    heading: "",
    description: "",
    button1Text: "",
    button2Text: "",
    backgroundImage: "",
  });

  const navigate = useNavigate();
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    // Simulate dynamic data (can be replaced with API later)
    setContent({
      heading: "Champions of Biodiversity",
      description:
        "We are a dedicated community of conservationists, educators, and nature lovers working to protect the rich diversity of life on Earth. From lush rainforests to ocean depths, we believe every species plays a vital role in sustaining our planet. Our mission is to conserve ecosystems, restore habitats, and inspire people to live in harmony with nature. Through hands-on projects, research, education, and global collaboration, we’re building a future where biodiversity thrives.",
      button1Text: "Join Our Mission",
      button2Text: "Explore Projects",
      backgroundImage: hero,
    });

    setStats([
      { label: "Years of Experience", value: "04+" },
      { label: "Campaigns Launched", value: "52+" },
      { label: "Members", value: "110+" },
      { label: "Average Growth Rate", value: "52%" },
    ]);
  }, []);

  const location = useLocation();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.scrollTo === "MissionVisionSection") {
      targetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  return (
    <>
      {/* {Green Bottom bar} */}
      <div className="absolute left-1/2 w-[70%]  md:h-[44%] lg:h-[90%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />
      <div
        className="rounded-3xl overflow-hidden shadow-xl relative text-white mx-4 md:mx-8 md:mb-4"
        style={{
          backgroundImage: `url(${content.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="font-rethink tracking-wide absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            {content.heading}
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-extralight text-gray-100 max-w-4xl mb-6 md:mb-8 pt-2 md:pt-3">
            {content.description}
          </p>
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center pt-4 md:pt-5">
            <button
              onClick={() =>
                window.scrollTo({
                  top: window.screenY + 500,
                  behavior: "smooth",
                })
              }
              className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium hover:bg-white hover:text-black transition text-sm sm:text-base"
            >
              {content.button1Text}
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black transition text-sm sm:text-base"
            >
              {content.button2Text}
              <img src={go} alt="go" className="w-5 h-5 sm:size-7" />
            </button>
          </div>
        </div>
      </div>

      {/* <ProjectsSection /> */}
      <div ref={targetRef}>
        <MissionVision />
      </div>

      <TeamSection />

      <section className="font-rethink mt-0 md:mt-0 px-4 md:px-20 py-5 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-10 tracking-wide">
          The Journey So Far
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-40 bg-gradient-to-r from-[#4E9F3D] via-green-900  to-[#1C3916] text-white rounded-xl px-4 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col tracking-wide items-center justify-center text-center"
            >
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="text-sm mt-1 pt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Whatsapp />
    </>
  );
};

export default AboutUs;
