import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null) // Fixed useState syntax

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (captain?._id && socket) {
      socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
      })

      // Location update logic
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          })
        }
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()

      // Add socket event listener
      socket.on('new-ride', (data) => {
        console.log('New ride received:', data)
        setRide(data)
        setRidePopupPanel(true)
      })

      // Cleanup function
      return () => {
        clearInterval(locationInterval)
        socket.off('new-ride')
      }
    }
  }, [captain, socket])

  async function confirmRide(rideId) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.status === 200) {
        // Handle successful confirmation
        setConfirmRidePopUpPanel(true)
        setRidePopupPanel(false)
      }
    } catch (error) {
      console.error('Failed to confirm ride:', error)
      alert('Failed to confirm ride. Please try again.')
    }
  }

  useGSAP(() => {
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen relative">
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
        <img className='w-16' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
        <Link to='/captain-login' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      
      <div className="h-3/5">
        <img className='h-full w-full object-cover' src='https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg' alt=''/>
      </div>
      
      <div className='h-2/5 p-6 bg-white'>
        <CaptainDetails/> 
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
        />
      </div>
    </div>
  )
}

export default CaptainHome