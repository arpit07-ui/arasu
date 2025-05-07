import React, { useEffect, useState } from "react";
import img from "../../public/assets/hero-images/hero-blog.svg";
import go from "../../public/assets/icons/go3.png";
import BlogsComponent from "../components/BlogSection";
import Whatsapp from "../components/Whatsapp";

interface HeroContent {
  backgroundImage: string;
  headingLine1: string;
  headingLine2: string;
  buttonText: string;
}

const Blogs: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroContent>({
    backgroundImage: "",
    headingLine1: "",
    headingLine2: "",
    buttonText: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data: HeroContent = {
        backgroundImage: img,
        headingLine1: "Biodiversity ",
        headingLine2: "Insights & Stories",
        buttonText: "Explore Blogs",
      };
      setHeroData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.title = "User | Blog";
  }, []);

  return (
    <>
      <div className="mx-5 mb-8">
        {/* Green Bottom bar */}
        <div className="absolute left-1/2 w-[90%] md:w-[70%]  bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />

        <div
          className="font-rethink relative rounded-3xl overflow-hidden w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[440px] flex justify-center text-center"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop: "2px",
          }}
        >
          {/* Content */}
          <div className="relative z-20 px-4 pt-[12%] sm:pt-[10%] w-full">
            <h1 className="text-black text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-wide">
              {heroData.headingLine1} <br /> {heroData.headingLine2}
            </h1>

            {/* Button Wrapper */}
            <div className="mt-4 sm:mt-6 flex justify-center pt-3 sm:pt-4">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.screenY + 500,
                    behavior: "smooth",
                  })
                }
                className="px-4 py-2 sm:px-5 sm:py-3 border-2 border-gray-400 bg-white bg-opacity-40 text-black rounded-full font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition text-sm sm:text-base"
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

      <BlogsComponent />
      {/* Footer Text */}
      <div className="relative w-full flex justify-center my-1 px-4">
        {/* Black Bar with Text */}
        {/* <div className="bg-black tracking-wide pb-3 text-white text-center flex items-center justify-center rounded-[20px] w-full h-24 max-w-6xl">
          Join hands. Save life. Protect Biodiversity.
        </div> */}

        {/* Button overlapping bottom center */}
        {/* <button className="absolute -bottom-4 bg-white text-black border-[1.5px] border-black px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition font-medium">
          Click to Continue
        </button> */}
      </div>
      <Whatsapp />
    </>
  );
};

export default Blogs;
