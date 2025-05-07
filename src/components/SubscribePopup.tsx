import { X, ArrowRight } from "lucide-react";
import bgImage from "../../public/assets/hero-images/hero-subscribePopup.svg"; 
import { useDispatch, useSelector } from "react-redux";
import { setSubscriberModel } from "../redux/authSlice";

const SubscribePopup: any = ({}: any) => {
  const open = useSelector((state: any) => state.auth.subscriberModel);
  const dispatch = useDispatch();
  if (!open) return null;

  return (
    <div className="font-rethink fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-[90%] max-w-lg sm:h-[25%] sm:p-10 lg:h-[42%]  h-[35%] p-6 rounded-2xl  text-white text-center  inset-0  bg-[#4E9F3D] bg-opacity-90"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          className="absolute top-3 right-4 text-white text-xl"
          onClick={() => dispatch(setSubscriberModel(false))}
        >
          <X />
        </button>
        <h2 className="text-3xl font-bold mb-1 tracking-wider">
          Subscribe Now!
        </h2>
        <p className="text-sm mb-6">Receive daily updates & much more!</p>
        <div className="flex items-center bg-white rounded-full px-4 py-2">
          <input
            type="email"
            placeholder="Enter E-mail address"
            className="flex-grow outline-none text-black bg-transparent placeholder:text-[#696969] placeholder:font-medium"
          />
          <button className="-ml-5 md:ml-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
