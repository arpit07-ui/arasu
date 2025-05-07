import elephant from "../../../public/assets/images/elephant.png";
import kangaru from "../../../public/assets/images/kangaru.png";
import leaf from "../../../public/assets/images/leaf.png";
import plant from "../../../public/assets/images/plant.png";


const stepData = [
  {
    id: 1,
    img: elephant,
    alt: "elephant",
    title: "Wildlife Habitat Preservation",
    description:
      "Every tree planted contributes to a healthier ecosystem and provides essential resources for animals in need.",
  },
  {
    id: 2,
    img: kangaru,
    alt: "kangaru",
    title: "Protecting Nature’s Creatures",
    description:
      "Our foundation is dedicated to conservation efforts, habitat preservation, and rescue operations.",
  },
  {
    id: 3,
    img: leaf,
    alt: "leaf",
    title: "Make a Difference",
    description:
      "Your contribution will help fund rescue operations, habitat preservation, and educational programs.",
  },
  {
    id: 4,
    img: plant,
    alt: "plant",
    title: "Nurturing Life at Its Roots",
    description:
      "Through every drop of care, we cultivate a greener future. Our mission focuses on reforestation.",
  },
];

const StepSection = () => {
  return (
    <div className="font-rethink flex flex-col items-center justify-center px-4 md:py-12 space-y-6">
      <h2 className="text-4xl font-medium text-center">
        Every Small Step Counts!
      </h2>

      {/* Green Info Section */}
      <div className="bg-gradient-to-r from-[#4E9F3D] via-green-900 to-[#1C3916] text-white rounded-xl p-6 w-full max-w-6xl flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-4">
        {stepData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center max-w-xs"
          >
            <img src={item.img} alt={item.alt} className="w-16" />
            <h3 className="font-medium text-lg pt-2">{item.title}</h3>
            <p className="font-extralight text-gray-100 text-sm mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default StepSection;
