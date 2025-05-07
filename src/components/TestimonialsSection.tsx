import React, { useState, useEffect } from "react";
import feedbackImage from "../../public/assets/feedback 1.svg";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Simulated dynamic data
    setTestimonials([
      {
        id: 1,
        name: "Neeraj Sharma",
        role: "Member",
        message:
          "Arasu Biodiversity empowered me to become a voice for biodiversity. It’s not just awareness — it’s real action on the ground.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        name: "Ankit Parmar",
        role: "Member",
        message:
          "Working with Arasu NGO has deepened my love for nature. Every tree we plant feels like hope rooted in the ground.",
        image: "https://randomuser.me/api/portraits/men/35.jpg",
      },
      {
        id: 3,
        name: "Arpit Singh",
        role: "Member",
        message:
          "Thanks to their guidance, I now use eco-friendly practices that protect wildlife and boost my crops. It’s a win for us and nature.",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
    ]);
  }, []);

  return (
    <section className="font-rethink w-full px-4 py-10 bg-white text-center">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-medium inline-block relative tracking-wide">
          Member’s <span className="font-bold text-black">Testimonials</span>
          {/* Gray line behind */}
          <div className="absolute left-4 right-4 md:left-8 md:right-8 -bottom-2 h-[2px] bg-gray-300"></div>
          {/* Green underline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2.5 h-[5px] w-32 md:w-40 bg-[#4E9F3D] rounded-full z-10"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-10 gap-28 place-items-center">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[#F1F1F1] rounded-[20px] px-6 py-10 relative shadow-sm w-full max-w-sm min-h-[220px] flex flex-col justify-between items-center"
          >
            {/* Green circle icon - top center */}
            <div className="w-12 h-12 bg-[#4E9F3D] rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -top-5 shadow-md z-10">
              <img
                src={feedbackImage}
                alt="feedback icon"
                className="w-6 h-6"
              />
            </div>

            {/* Message - middle section */}
            <div className="flex-1 flex items-center justify-center px-2 text-center">
              <p className="text-[#5A5A5A] text-[14px] font-medium leading-relaxed">
                {testimonial.message}
              </p>
            </div>

            {/* User info - bottom center */}
            <div className="absolute -bottom-[34%] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-[60px] h-[60px] rounded-full border-2 border-[#4E9F3D] object-cover mb-2"
              />
              <p className="text-[#000000] font-semibold text-sm">
                {testimonial.name}
              </p>
              <p className="text-[13px] text-[#8E8E8E]">Member</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="relative w-full flex justify-center mt-36 md:mt-40 px-4">
        {/* Black Bar with Text */}
        <div className="bg-black tracking-wide pb-3 text-white text-center flex items-center justify-center rounded-[20px] w-full h-28 md:h-24 max-w-6xl px-4 md:px-0 text-sm md:text-base leading-snug">
          Every species matters. Every member counts. Join us and make your
          impact.
        </div>

        {/* Button overlapping bottom center */}
        <button className="absolute -bottom-4 bg-white text-black border-[1.5px] border-black px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition font-medium text-sm md:text-base">
          Click to Continue
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
