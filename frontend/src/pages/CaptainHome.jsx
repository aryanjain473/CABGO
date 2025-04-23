import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    // Set userId and userType in localStorage when captain logs in
    if (captain?._id) {
      localStorage.setItem('userId', captain._id);
      localStorage.setItem('userType', 'captain');
    }
  }, [captain]);

  useEffect(() => {
    if (!socket || !captain?._id) return;

    // Debug socket connection
    console.log('Socket connection status:', {
      isConnected: socket.connected,
      socketId: socket.id,
      captainId: captain._id
    });

    function handleNewRide(data) {
      console.log('🚗 New ride data received:', data);
      if (!data) {
        console.error('Received empty ride data');
        return;
      }

      setRide(prevRide => {
        console.log('Updating ride state:', { current: prevRide, new: data });
        return data;
      });
      setRidePopupPanel(true);
    }

    socket.on('new-ride', handleNewRide);
    
    // Re-join on reconnection
    socket.on('reconnect', () => {
      console.log('Socket reconnected, rejoining...');
      socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
      });
    });

    // Initial join
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });

    return () => {
      socket.off('new-ride', handleNewRide);
      socket.off('reconnect');
    };
  }, [socket, captain]);

  // Start location updates only after successful socket connection
  useEffect(() => {
    if (!socket?.connected || !captain?._id) return;

    const locationInterval = setInterval(() => {
      navigator.geolocation?.getCurrentPosition(
        position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        error => console.error('Geolocation error:', error),
        { enableHighAccuracy: true }
      );
    }, 10000);

    return () => clearInterval(locationInterval);
  }, [socket?.connected, captain]);

  // 🚦 Accept ride confirmation logic
  async function confirmRide(rideId) {
    console.log('✅ Confirming ride with ID:', rideId);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        console.log('🎉 Ride confirmed:', response.data.ride);
        setConfirmRidePopUpPanel(true);
        setRidePopupPanel(false);
      }
    } catch (error) {
      console.error('❌ Failed to confirm ride:', error.response || error);
      alert(`Failed to confirm ride: ${error.response?.data?.error || error.message}`);
    }
  }

  // GSAP animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative">
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
        <img className='w-16' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
        <Link to='/captain-login' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img className='h-full w-full object-cover' src='https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg' alt='' />
      </div>

      <div className='h-2/5 p-6 bg-white'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-12">
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopupPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-30 bottom-0 translate-y-full bg-white px-3 py-12">
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopupPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
