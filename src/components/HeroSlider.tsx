
import React, { useState, useEffect } from "react";
import image1 from "../../public/assets/images/anne-nygard-v5mEr9CfG18-unsplash.jpg";
import image2 from "../../public/assets/images/boys-in-bristol-photography-rFhwYinX41Q-unsplash.jpg";
import image3 from "../../public/assets/images/k-p-d-madhuka-1NPcn9OOuog-unsplash.jpg";
import image4 from "../../public/assets/images/patrick-perkins-doIS4HkxzDo-unsplash.jpg";
import image5 from "../../public/assets/images/rafay-ansari-prhMYojFJRY-unsplash.jpg";


interface Doctor {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  description: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Shaun",
    specialty: "Cardiologist",
    image: image1,
    rating: 4.5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    name: "Dr. Brown",
    specialty: "Neurologist",
    image: image2,
    rating: 4.7,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    name: "Dr. Andrew",
    specialty: "Surgeon",
    image: image3,
    rating: 5.0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    name: "Dr. Angel",
    specialty: "Pediatrician",
    image: image4,
    rating: 4.6,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    name: "Dr. Zhoya",
    specialty: "Dentist",
    image: image5,
    rating: 4.4,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
];

const DoctorCard: React.FC<{
  index?: number;
  doctor: Doctor;
  isCenter?: boolean;
}> = ({ doctor, isCenter = false, index }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg p-1 ${
        isCenter ? "w-64" : "w-48"
      } text-left transition-all hover:shadow-xl ${
        isCenter ? "scale-110 z-10" : "scale-90 opacity-90"
      }`}
    >
      <img
        src={doctor.image}
        // alt={doctor.name}
        className={`h-56 w-full object-cover rounded-xl`}
      />
      {/* <h3 className="mt-2 text-sm font-semibold">{doctor.name}</h3>
      <p className="text-xs text-gray-500">{doctor.specialty}</p>
      <p className="text-[9px] text-gray-500 mt-1">{doctor?.description}</p>

      <div className="mt-3 flex justify-center gap-2">
        <button
          className={`bg-[#00B4FE] text-white hover:bg-sky-500 px-2 py-1 rounded-lg text-xs`}
        >
          Book Now
        </button>
        <button className="border px-2 py-1 rounded-lg text-xs">View</button>
      </div> */}
    </div>
  );
};

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleDoctors = () => {
    const visibleDoctors = [];
    const length = doctors.length;

    visibleDoctors.push(doctors[(currentIndex - 2 + length) % length]);
    visibleDoctors.push(doctors[(currentIndex - 1 + length) % length]);
    visibleDoctors.push(doctors[currentIndex]);
    visibleDoctors.push(doctors[(currentIndex + 1) % length]);
    visibleDoctors.push(doctors[(currentIndex + 2) % length]);

    return visibleDoctors;
  };

  const visibleDoctors = getVisibleDoctors();

  return (
    <div className="text-center py-8">
      <div className="flex items-center justify-center relative h-80">
        {/* Far left card */}
        <div className="absolute left-[14%] w-[150px] opacity-100 z-0">
          <DoctorCard doctor={visibleDoctors[0]} />
        </div>

        {/* Left card */}
        {/* <div className="absolute left-1/4 w-[150px] opacity-100 z-1">
  <DoctorCard doctor={visibleDoctors[1]} />
</div> */}

        {/* Center card */}
        <div className="relative w-[150px] z-30 scale-100 transition-all duration-300">
          <DoctorCard doctor={visibleDoctors[2]} isCenter />
        </div>

        {/* Right card */}
        {/* <div className="absolute right-1/4 w-[150px] opacity-100 z-1">
  <DoctorCard doctor={visibleDoctors[3]} />
</div> */}

        {/* Far right card */}
        <div className="absolute right-[5%] w-[150px] opacity-100 z-0">
          <DoctorCard doctor={visibleDoctors[4]} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center ml-28 space-x-2">
        {doctors.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-3" : "bg-transparent border"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
