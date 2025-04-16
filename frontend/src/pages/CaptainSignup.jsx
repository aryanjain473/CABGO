import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity), // Ensure it's a number
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");

        // Clear inputs
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity("");
        setVehicleType("");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(
        "Signup failed: " +
          (error.response?.data?.message || JSON.stringify(error.response?.data.errors))
      );
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://static.vecteezy.com/system/resources/thumbnails/002/581/764/small/car-steering-wheel-logo-illustration-free-vector.jpg"
          alt="Cabgo Logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg w-full font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Create password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <input
            className="bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="text"
            required
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
          <input
            className="bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="text"
            required
            placeholder="Vehicle Plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
          <input
            className="bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
            type="number"
            required
            placeholder="Vehicle Capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
          <select
  className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg"
  value={vehicleType}
  required
  onChange={(e) => setVehicleType(e.target.value)}
>
  <option value="">Select Vehicle Type</option>
  <option value="sedan">Sedan</option>
  <option value="hatchback">Hatchback</option>
  <option value="suv">SUV</option>          {/* 👈 lowercase value */}
  <option value="mini van">Mini Van</option>
  <option value="luxury">Luxury</option>
</select>

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2 w-full text-lg"
          >
            Create Captain
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login as Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/signup"
          className="bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg"
        >
          Sign up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
