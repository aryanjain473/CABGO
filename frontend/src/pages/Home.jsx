import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';

import VehiclePanel from '../components/VehiclePanel';
import LocationSearchPanel from '../components/LocationSearchPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/userContext';
const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(''); // 'pickup' or 'destination'
  const [fare, setFare] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    if (user?._id) {
        const joinData = {
            userId: user._id,
            userType: "user"
        };
        console.log("Emitting join event with data:", joinData);
        socket.emit("join", joinData);

        // Listen for join confirmation
        socket.on('join_confirmed', (data) => {
            console.log('Join confirmed from server:', data);
        });

        return () => {
            socket.off('join_confirmed');
        };
    }
}, [user, socket]);
  
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(()=> {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehicleFound]);


  useGSAP(function () {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'  // Fixed from translate(100%) to translateY(100%)
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    
      // setIsLoading(true);
      setVehiclePanel(true);
      setPanelOpen(false);

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFare(response.data.fare);
    } 
  

  const createRide = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data && response.data.ride) {
        console.log('Ride created successfully:', response.data.ride);
        return response.data.ride;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating ride:', error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img src="Cabgo.png" alt="Cabgo" className="w-16 absolute left-5 top-5" />

      <div
        onClick={() => {
          setVehiclePanel(false);
        }}
        className="w-screen h-screen"
      >
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>

      <div className="bg-white flex flex-col justify-end h-screen absolute top-0 w-full p-5">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-grey-700 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Add a pick-up location"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-5"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              type="text"
              placeholder="Enter a destination"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-5"
            />
          </form>
          <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {vehiclePanel && (
  <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
    <VehiclePanel
      selectVehicle={setVehicleType}
      fare={fare}
      setConfirmRidePanel={setConfirmRidePanel}
      setVehiclePanel={setVehiclePanel}
    />
  </div>
)}

{confirmRidePanel && (
  <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
    <ConfirmRide
      createRide={createRide}
      pickup={pickup}
      destination={destination}
      fare={fare}
      vehicleType={vehicleType}
      setConfirmRidePanel={setConfirmRidePanel}
      setVehicleFound={setVehicleFound}
    />
  </div>
)}

{vehicleFound && (
  <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
    <LookingForDriver
      pickup={pickup}
      destination={destination}
      fare={fare}
      vehicleType={vehicleType}
      setVehicleFound={setVehicleFound}
      setWaitingForDriver={setWaitingForDriver}
    />
  </div>
)}

{waitingForDriver && (
  <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
    <WaitingForDriver 
      pickup={pickup}
      destination={destination}
      vehicleType={vehicleType}
    />
  </div>
)}
    </div>
  );
            }
export default Home;