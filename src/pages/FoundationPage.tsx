// import React, { useEffect, useState } from "react";
// import hero from "../../public/assets/hero-images/hero-foundation.svg";
// import go from "../../public/assets/icons/go.png";
// import { useNavigate } from "react-router-dom";
// import { HeroContent } from "../types/foundationType";
// import ProjectsSection from "../components/landingPage/ProjectSection";
// import MissionVision from "../components/MissionVision";
// import StepSection from "../components/landingPage/StepSection";
// import Whatsapp from "../components/Whatsapp";

// const HeroSlider: React.FC = () => {
//   const [content, setContent] = useState<HeroContent>({
//     heading: "",
//     description: "",
//     button1Text: "",
//     button2Text: "",
//     backgroundImage: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate dynamic data (can be replaced with API later)
//     setContent({
//       heading: "Champions of Biodiversity",
//       description:
//         "We are a dedicated community of conservationists, educators, and nature lovers working to protect the rich diversity of life on Earth. From lush rainforests to ocean depths, we believe every species plays a vital role in sustaining our planet. Our mission is to conserve ecosystems, restore habitats, and inspire people to live in harmony with nature. Through hands-on projects, research, education, and global collaboration, we’re building a future where biodiversity thrives.",
//       button1Text: "Join Our Mission",
//       button2Text: "Explore Projects",
//       backgroundImage: hero,
//     });
//   }, []);

//   return (
//     <>
//       {/* {Green Bottom bar} */}
//       <div className="absolute left-1/2 w-[70%]  md:h-[44%] lg:h-[90%] bg-[#4E9F3D61] rounded-3xl z-0 transform -translate-x-1/2" />
//       <div
//         className="rounded-3xl overflow-hidden shadow-xl relative text-white mx-4 md:mx-8 md:mb-4"
//         style={{
//           backgroundImage: `url(${content.backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "500px",
//         }}
//       >
//         <div className="font-rethink tracking-wide absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-20">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
//             {content.heading}
//           </h1>
//           <p className="text-xs sm:text-sm md:text-base font-extralight text-gray-100 max-w-4xl mb-6 md:mb-8 pt-2 md:pt-3">
//             {content.description}
//           </p>
//           <div className="flex gap-3 sm:gap-4 flex-wrap justify-center pt-4 md:pt-5">
//             <button className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium hover:bg-white hover:text-black transition text-sm sm:text-base">
//               {content.button1Text}
//             </button>
//             <button
//               onClick={() => navigate("/projects")}
//               className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white border-opacity-30 bg-black bg-opacity-40 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black transition text-sm sm:text-base"
//             >
//               {content.button2Text}
//               <img src={go} alt="go" className="w-5 h-5 sm:size-7" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <ProjectsSection />
//       <MissionVision />
//       <StepSection/>
//       <Whatsapp/>
//     </>
//   );
// };

// export default HeroSlider;
