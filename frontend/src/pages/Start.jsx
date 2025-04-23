import React from "react";
import { Link } from "react-router-dom";
import CABGO_logo1 from './CABGO_logo1.png';  // Add this import if image is in same folder

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url('https://t4.ftcdn.net/jpg/02/76/72/91/360_F_276729195_EUSoVepkkTdfJnJaIzNIEVgM3usaxqU2.jpg')] h-screen pt-8 flex justify-between flex-col w-full">
        
        <img 
          className="w-32 ml-8 -mt-12 object-contain" 
          src={CABGO_logo1}  // Use the imported image
          alt="CABGO Logo" 
        />

        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-[30px] font-bold">Get Started with Cabgo</h2>

          <Link 
            to="/login" 
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Start;
