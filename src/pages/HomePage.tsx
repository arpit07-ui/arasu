import React, { useState } from "react";
import hero from "../../public/assets/hero-images/hero-home.svg";
import go from "../../public/assets/icons/go.png";
import HeroSlider from "../components/HeroSlider";
import Events from "../components/landingPage/Events";
import { HomeContent, initialHomeContent } from "../types/homeType";
import { useNavigate } from "react-router-dom";
import ProjectsSection from "../components/landingPage/ProjectSection";
import WildlifeCard from "../components/landingPage/WildlifeCard";
import StepSection from "../components/landingPage/StepSection";
import Whatsapp from "../components/Whatsapp";

const Home: React.FC = () => {
  const [homeContent, setHomeContent] =
    useState<HomeContent>(initialHomeContent);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/aboutUs", { state: { scrollTo: "MissionVisionSection" } });
  };

  return (
    <>
      {/* Green Bottom bar */}
      <div className="absolute left-1/2 w-[90%] sm:w-[80%] md:w-[70%] md:h-[93%] lg:h-[94%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />

      {/* Hero section */}
      <div className="font-rethink relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        {/* Content container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* Left: Text Content */}
            <div className="w-full lg:w-2/3 text-white py-7 sm:py-12 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-wider leading-snug mb-4">
                {homeContent.title}
              </h1>
              <p className="text-sm sm:text-md font-extralight text-gray-100 mt-4 sm:mt-8 mb-6 sm:mb-8">
                {homeContent.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
                <button
                  onClick={handleClick}
                  className="px-6 py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium hover:bg-white hover:text-black transition"
                >
                  Join Our Mission
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="px-6 py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black transition"
                >
                  {homeContent.ctaText}
                  <img src={go} alt="go" className="size-5 sm:size-6" />
                </button>
              </div>
            </div>

            {/* Right: HeroSlider */}
            <div className="w-full lg:w-1/2 ">
              <div className="w-full max-w-full">
                <HeroSlider />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectsSection />
      <Events setHomeContent={setHomeContent} />
      <WildlifeCard />
      <StepSection />
      <Whatsapp />
    </>
  );
};

export default Home;
