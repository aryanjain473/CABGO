import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url('https://t4.ftcdn.net/jpg/02/76/72/91/360_F_276729195_EUSoVepkkTdfJnJaIzNIEVgM3usaxqU2.jpg')] h-screen pt-8 flex justify-between flex-col w-full">
        
        <img className="w-16 ml-8" src="Cabgo.png" alt="Cabgo Logo" />

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

export default Home;
