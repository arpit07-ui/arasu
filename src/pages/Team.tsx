import React, { useEffect, useState } from "react";
import go from "../../public/assets/icons/go.png";
import img from "../../public/assets/hero-images/hero-team.svg";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Whatsapp from "../components/Whatsapp";

interface Stat {
  label: string;
  value: string;
}

interface HeroContent {
  backgroundImage: string;
  headingLine1: string;
  headingLine2: string;
  buttonText: string;
}

const Team: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroContent>({
    backgroundImage: "",
    headingLine1: "",
    headingLine2: "",
    buttonText: "",
  });
  const [stats, setStats] = useState<Stat[]>([]);
  useEffect(() => {
    // Mock dynamic data (replace this with an API call later)
    const fetchData = async () => {
      const data: HeroContent = {
        backgroundImage: img,
        headingLine1: "Our Team of ABF ",
        headingLine2: "Champions",
        buttonText: "Explore Team",
      };
      setHeroData(data);
    };

    fetchData();

    setStats([
      { label: "Years of Experience", value: "04+" },
      { label: "Campaigns Launched", value: "52+" },
      { label: "Members", value: "110+" },
      { label: "Average Growth Rate", value: "52%" },
    ]);
  }, []);

  return (
    <>
      <div className="mx-4 sm:mx-6 md:mx-10 mb-5 sm:mb-16 md:mb-20">
        {/* Green Bottom bar */}
        <div className="absolute left-1/2 w-[85%] sm:w-[75%] md:w-[70%]  sm:h-[70%] md:h-[36%] lg:h-[80%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />

        <div
          className="font-rethink relative rounded-3xl overflow-hidden w-full h-[200px] sm:h-[260px] md:h-[400px] lg:h-[440px] flex justify-center text-center"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

          {/* Content */}
          <div className="relative z-20 px-4 pt-[12%] sm:pt-[10%] md:pt-[8%]">
            <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-bold leading-snug sm:leading-normal tracking-wide">
              {heroData.headingLine1} <br className="hidden sm:block" />{" "}
              {heroData.headingLine2}
            </h1>

            {/* Button Wrapper */}
            <div className="mt-4 sm:mt-6 flex justify-center pt-2 sm:pt-4">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.screenY + 500,
                    behavior: "smooth",
                  })
                }
                className="px-4 sm:px-5 py-2 sm:py-3 border-2 border-gray-300 bg-gray-800 bg-opacity-40 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black transition"
              >
                {heroData.buttonText}
                <span>
                  <img src={go} alt="go" className="w-5 h-5 sm:size-7" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TeamSection />
      <TestimonialsSection />

      <section className="font-rethink px-4 md:px-20 py-5 text-center">
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

export default Team;
