import React, { useEffect, useState } from "react";
import img from "../../public/assets/hero-images/hero-project.svg";
import go from "../../public/assets/icons/go2.png";
import ProjectsGrid from "../components/ProjectHero";
import JourneySoFar from "../components/JourneySoFar";
import Whatsapp from "../components/Whatsapp";
import GalleryCard from "../components/GalleryCard";
import ProjectShowcase from "../components/ProjectShowcase";

interface HeroContent {
  backgroundImage: string;
  headingLine1: string;
  headingLine2: string;
  buttonText: string;
}

const HeroSlider: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroContent>({
    backgroundImage: "",
    headingLine1: "",
    headingLine2: "",
    buttonText: "",
  });

  useEffect(() => {
    // Mock dynamic data (replace this with an API call later)
    const fetchData = async () => {
      const data: HeroContent = {
        backgroundImage: img,
        headingLine1: "Greening cities, growing",
        headingLine2: "biodiversity.",
        buttonText: "Explore Projects",
      };
      setHeroData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mx-4 sm:mx-6 md:mx-4 lg:mx-10 mb-4">
        {/* Green Bottom bar */}
        <div className="absolute left-1/2 w-[90%] sm:w-[80%] md:w-[70%] sm:h-[70%] md:h-[36%] lg:h-[80%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />

        <div
          className="font-rethink relative rounded-3xl overflow-hidden w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[440px] flex justify-center text-center"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

          {/* Content */}
          <div className="relative z-20 px-4 pt-[15%] sm:pt-[12%] md:pt-[10%]">
            <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-bold leading-6 tracking-wide">
              {heroData.headingLine1} <br /> {heroData.headingLine2}
            </h1>

            {/* Button Wrapper */}
            <div className="mt-4 sm:mt-6 flex justify-center pt-4">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.scrollY + 500,
                    behavior: "smooth",
                  })
                }
                className="px-4 py-2 sm:px-5 sm:py-3 border-2 border-gray-300 bg-gray-800 bg-opacity-40 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black transition text-sm sm:text-base"
              >
                {heroData.buttonText}
                <span>
                  <img src={go} alt="go" className="size-5 sm:size-7" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProjectsGrid />
      <GalleryCard />
      <JourneySoFar />
      <ProjectShowcase/>
      <Whatsapp />
    </>
  );
};

export default HeroSlider;
