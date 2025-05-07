import { useEffect, useState } from "react";
import cardImage from "../../../public/assets/hero-images/hero-wildlifeCard.svg";

interface WildlifeContent {
  title: string;
  description: string;
  image: string;
}

const WildlifeCard = () => {
  const [content, setContent] = useState<WildlifeContent>({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Mock dynamic data (replace this with API later)
    const fetchData = async () => {
      const data = {
        title: "Making a Difference",
        description:
          "Describes the foundation’s impact and invites the audience to learn more about their initiatives (e.g., habitat restoration, rescue operations, educational programs).",
        image: cardImage,
      };
      setContent(data);
    };

    fetchData();
  }, []);

  return (
    <div className="font-rethink py-12 px-4 md:px-12 relative">
      {/* Green Bottom Bar */}
      <div className="absolute left-1/2 w-[70%]  md:h-[81%] lg:h-[87%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />

      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          src={content.image}
          alt="Wildlife"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Content - improved responsiveness */}
        <div className="absolute inset-0 flex flex-col justify-center items-end px-4 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24">
          <div className="w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 text-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 leading-tight">
              {content.title} <br /> for Wildlife
            </h2>
            <p className="text-white text-opacity-85 text-xs sm:text-sm md:text-base max-w-full  leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WildlifeCard;
