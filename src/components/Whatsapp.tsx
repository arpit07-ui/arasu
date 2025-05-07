import { FaWhatsapp } from "react-icons/fa";
import whatsapp from "../../public/assets/images/whatsapp.svg";

const Whatsapp = () => {
  const phoneNumber = "918349534469"; // Replace with your number
  const defaultMessage = "Hi there! I have a question about...";

  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const encodedMessage = encodeURIComponent(defaultMessage);

    if (isMobile) {
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
      );
    }
  };

  return (
    <>
      {/* WhatsApp Section */}
      <div className="relative w-full flex justify-center pt-8 md:py-6 px-4 sm:px-6">
        {/* Green line behind */}
        <div className="absolute top-1/2 left-0 w-full h-[10px] sm:h-[15px] rounded-sm bg-[#4E9F3D69] z-0" />

        {/* WhatsApp Card */}
        <div className="relative bg-[#4E9F3D] text-white rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center shadow-lg z-10">
          {/* Background Icons */}
          <div className="absolute text-[100px] sm:text-[140px] text-white opacity-10 -top-8 -left-8 sm:-top-10 sm:-left-10">
            <FaWhatsapp />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-wide leading-tight">
            Connect On <span className="text-white">Whats</span>
            <span className="inline-flex items-center">
              <img src={whatsapp} alt="" className="size-4 sm:size-5 ml-1" />
              pp
            </span>
          </h3>

          <div className="absolute text-[100px] sm:text-[140px] text-white opacity-10 -right-4 sm:-right-6 -bottom-1/4 sm:-bottom-1/3">
            <FaWhatsapp />
          </div>

          <p className="text-xs sm:text-sm font-extralight text-gray-100 mb-4 sm:mb-5">
            Receive daily updates & much more!
          </p>
          {/* <a
            href="https://wa.me/919876543210?text=Hi%20there!%20I%20came%20from%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
          > */}
          <button
            onClick={handleClick}
            className="bg-white text-green-600 font-semibold text-sm sm:text-base px-5 sm:px-6 py-2 rounded-full hover:bg-green-100 transition"
          >
            Click to Continue
          </button>
          {/* </a> */}
        </div>
      </div>
    </>
  );
};

export default Whatsapp;
