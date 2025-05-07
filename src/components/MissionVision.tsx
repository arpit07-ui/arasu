// MissionVisionSection.tsx

import missionBg from "../../public/assets/images/our-mission.svg";
import visionBg from "../../public/assets/images/our-vision.svg";
import missionImg from "../../public/assets/icons/mission-vector.svg";
import visionImg from "../../public/assets/icons/vision-vector.svg";

const MissionVisionSection = () => {
  return (
    <div className="mb-4">
      <div className="font-rethink bg-[#CECECE] z-1 relative bg-opacity-[38%] px-4 pb-10">
        <div>
          <div className="flex justify-center text-3xl md:text-4xl pt-12">
            Our Mission & Our Vision
          </div>

          {/* Mission Section */}
          <div
            className="bg-cover bg-center rounded-xl p-6 md:p-10 text-black mb-6 md:mb-0"
            style={{
              backgroundImage:
                window.innerWidth >= 768 ? `url(${missionBg})` : "none",
              maxHeight: 1000,
            }}
          >
            {/* Mobile Card View */}

            <div className="md:hidden relative rounded-xl overflow-hidden shadow-md">
              {/* Blurred Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B92B27] to-[#1565C0] backdrop-bl-xl opacity-60"></div>

              {/* Foreground Content */}
              <div className="relative z-10 p-5 text-black">
                <h2 className="text-center flex items-center justify-center text-2xl mb-2">
                  <img src={missionImg} alt="Mission" className="size-6 mr-2" />
                  Our Mission
                </h2>
                <h4 className="font-medium mb-2 text-sm">
                  Nurturing Earth's Legacy: Balance, Renewal, Discovery
                </h4>
                <div className="h-48 overflow-y-auto text-sm leading-relaxed pr-1">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      We envision a world where humanity thrives in harmony with
                      nature's diversity. Through strategic initiatives in
                      biodiversity conservation, agroforestry innovation, and
                      renewable energy advancement, we strive to heal our planet
                      while creating sustainable prosperity.
                    </li>
                    <li>
                      Our commitment extends beyond preservation to
                      transformation—where educational research inspires
                      environmental stewardship, recreational activities foster
                      meaningful connections with nature, and commercial
                      endeavors respect ecological boundaries.
                    </li>
                    <li>
                      Together, we're building resilient ecosystems and
                      communities that will withstand climate challenges and
                      flourish for generations to come. We don't just mitigate
                      environmental damage—we cultivate a future where
                      biodiversity and human innovation evolve as partners in a
                      sustainable world.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Desktop View (Hidden on Mobile) */}
            <div className="hidden md:block">
              <h2 className="text-center flex items-center justify-center mt-20 text-3xl md:text-4xl">
                <img src={missionImg} alt="Mission" className="size-8" />
                &nbsp; Our Mission
              </h2>
              <div className="flex flex-col items-start justify-start mr-2 pt-2 md:w-[65%] h-[250px] overflow-y-auto text-xs md:text-[12px] leading-relaxed mx-auto">
                <h4 className="text-sm md:text-base font-medium mb-3">
                  Nurturing Earth's Legacy: Balance, Renewal, Discovery
                </h4>
                <ul className="list-disc pl-4 space-y-3 text-gray-800">
                  <li>
                    We envision a world where humanity thrives in harmony with
                    nature's diversity. Through strategic initiatives in
                    biodiversity conservation, agroforestry innovation, and
                    renewable energy advancement, we strive to heal our planet
                    while creating sustainable prosperity.
                  </li>
                  <li>
                    Our commitment extends beyond preservation to
                    transformation—where educational research inspires
                    environmental stewardship, recreational activities foster
                    meaningful connections with nature, and commercial endeavors
                    respect ecological boundaries.
                  </li>
                  <li>
                    Together, we're building resilient ecosystems and
                    communities that will withstand climate challenges and
                    flourish for generations to come. We don't just mitigate
                    environmental damage—we cultivate a future where
                    biodiversity and human innovation evolve as partners in a
                    sustainable world.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div
            className="bg-cover bg-center rounded-xl p-6 md:p-10 text-black"
            style={{
              backgroundImage:
                window.innerWidth >= 768 ? `url(${visionBg})` : "none",
              maxHeight: 1000,
            }}
          >
            {/* Mobile Card View */}
            <div className="md:hidden relative rounded-xl overflow-hidden shadow-md">
              {/* Blurred Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#AD5389] to-[#3C1053] backdrop-bl-xl opacity-60"></div>

              {/* Foreground Content */}
              <div className="relative z-10 p-5 text-black">
                <h2 className="text-center flex items-center justify-center text-2xl mb-2">
                  <img src={visionImg} alt="Vision" className="size-6 mr-2" />
                  Our Vision
                </h2>
                <h4 className="font-medium mb-2 text-sm">
                  Our mission is to heal and protect Earth's biodiversity
                  through education, action, and innovation. We accomplish this
                  by:
                </h4>
                <div className="h-52 overflow-y-auto text-sm leading-relaxed pr-1">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      Empowering communities with knowledge and skills in
                      conservation and sustainable resource management
                    </li>
                    <li>
                      Implementing strategic reforestation initiatives and
                      habitat restoration projects that prioritize native
                      species while combating invasive threats
                    </li>
                    <li>
                      Advancing ecological agriculture methods including
                      regenerative farming, conservation practices, managed
                      grazing systems, silvopasture, and tree intercropping
                    </li>
                    <li>
                      Building bridges between traditional wisdom and modern
                      science to create resilient ecosystems
                    </li>
                    <li>
                      Transforming awareness into action through hands-on
                      involvement in environmental stewardship
                    </li>
                  </ul>
                  {/* <div className="text-xs pt-3">
                    Through these efforts, we create measurable positive impact
                    on biodiversity, climate resilience, and sustainable
                    livelihoods—ensuring that future generations inherit a
                    planet rich in natural diversity and abundance.
                  </div> */}
                </div>
              </div>
            </div>

            {/* Desktop View (Hidden on Mobile) */}
            <div className="hidden md:block">
              <h2 className="text-center flex items-center justify-center mt-20 text-3xl md:text-4xl">
                <img src={visionImg} alt="Vision" className="size-8" />
                &nbsp; Our Vision
              </h2>
              <div className="flex flex-col items-start justify-start mr-2 pt-4 md:w-[65%] h-[250px] text-xs md:text-[11px] leading-relaxed mx-auto">
                <h4 className="text-sm md:text-base font-medium mb-3">
                  Our mission is to heal and protect Earth's biodiversity
                  through education, action, and innovation. We accomplish this
                  by:
                </h4>
                <ul className="list-disc pl-4 space-y-3 text-gray-800">
                  <li>
                    Empowering communities with knowledge and skills in
                    conservation and sustainable resource management
                  </li>
                  <li>
                    Implementing strategic reforestation initiatives and habitat
                    restoration projects that prioritize native species while
                    combating invasive threats
                  </li>
                  <li>
                    Advancing ecological agriculture methods including
                    regenerative farming, conservation practices, managed
                    grazing systems, silvopasture, and tree intercropping
                  </li>
                  <li>
                    Building bridges between traditional wisdom and modern
                    science to create resilient ecosystems
                  </li>
                  <li>
                    Transforming awareness into action through hands-on
                    involvement in environmental stewardship
                  </li>
                </ul>
                {/* <div className="text-sm pt-8 text-[#696969]">
                  Through these efforts, we create measurable positive impact on
                  biodiversity, climate resilience, and sustainable
                  livelihoods—ensuring that future generations inherit a planet
                  rich in natural diversity and abundance.
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Green Bottom Bar */}
      <div className="absolute left-1/2 w-[70%] lg:h-[3%] bg-[#4E9F3D61] rounded-br-3xl rounded-bl-3xl z-0 transform -translate-x-1/2" />
      <br />
    </div>
  );
};

export default MissionVisionSection;
