import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import titleImg from "../../public/assets/ABF.svg";
import { useDispatch } from "react-redux";
import { setSubscriberModel } from "../redux/authSlice";
import { Link } from "react-router-dom";
import SubscribePopup from "./SubscribePopup";

// For Resources
const resourcesLinks = [
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Cookie Policy", path: "/cookies" },
  { name: "Pricing & Plans", path: "/pricing" },
];

const helpLinks = [
  { name: "Contact Us", path: "/contact" },
  { name: "About Us", path: "/aboutUs" },
  { name: "FAQs", path: "/cookies" },
  { name: "Volunteer with us!", path: "/pricing" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/" },
];

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <footer className="relative bg-black text-white pt-8 px-4 sm:px-6 lg:px-20 font-rethink rounded-t-xl mt-10">
        {/* Green Bottom bar */}
        <div className="absolute left-1/2 top-[-3%] sm:top-[-8%]  md:h-[8%] w-[80%] sm:w-[80%] md:w-[70%] bg-[#4E9F3D61] rounded-tr-2xl rounded-tl-2xl z-0 transform -translate-x-1/2" />

        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center md:items-start text-center md:text-left gap-10 pb-8 border-b border-gray-700 relative z-10">
          {/* Logo and Description */}
          <div className="flex-1 min-w-[250px] max-w-sm">
            <div className="flex items-center mb-0">
              {/* <img src={logo} alt="ABF Logo" className="h-10 w-auto" /> */}
              <img
                src={titleImg}
                alt="title"
                className="h-20 scale-150 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              We’re dedicated to preserving the planet’s rich biodiversity
              through awareness, education, and action.
            </p>
            <button
              onClick={() => dispatch(setSubscriberModel(true))}
              className="mt-6 sm:mt-10 bg-white text-black font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Subscribe Now!
            </button>
          </div>

          {/* Resources */}
          <div className="flex flex-col min-w-[180px]">
            <h3 className="text-base sm:text-lg font-semibold mb-2 inline-block">
              <span className="inline-flex flex-col items-start">
                <span className="whitespace-nowrap">Resources</span>
                <span className="border-b-2 border-green-500 w-[70%]" />
              </span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-300 mt-3">
              {resourcesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Help */}
          <div className="flex flex-col min-w-[180px]">
            <h3 className="text-base sm:text-lg font-semibold mb-2 inline-block">
              <span className="inline-flex flex-col items-start">
                <span className="whitespace-nowrap">Get Help</span>
                <span className="border-b-2 border-green-500 w-[70%]" />
              </span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-300 mt-3">
              {helpLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-white cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col min-w-[180px] items-center md:items-start text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-2 inline-block">
              <span className="inline-flex flex-col items-center md:items-start">
                <span className="whitespace-nowrap">Follow Us</span>
                <span className="border-b-2 border-green-500 w-[70%]" />
              </span>
            </h3>

            <div className="flex justify-center md:justify-start items-center gap-4 text-xl text-white mt-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="hover:text-green-500 transition bg-white rounded-full text-black p-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-white">
        <div className="text-center text-xs sm:text-sm text-gray-800 py-3">
          © 2025 All Rights Reserved ABF
        </div>
      </div>

      <SubscribePopup />
    </>
  );
};

export default Footer;
