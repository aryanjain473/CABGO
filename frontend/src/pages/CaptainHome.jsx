import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopUpPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  useGSAP(function () {
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else{
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen">
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
        <Link to='/captain-login' className="right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 ">
    <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>
    <div className="h-3/5">
    <img className='h-full w-full object-cover' src='https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg' alt=''/>
    </div>
    <div className='h-2/5 p-6'>
      <CaptainDetails/>
     </div>
     <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12">
     <RidePopUp
  setRidePopUpPanel={setRidePopupPanel}
  setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
/>
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-12">
        <ConfirmRidePopUp setConfirmRidePopUpPanel = { setConfirmRidePopUpPanel} setRidePopUpPanel = { setRidePopupPanel}/>
      </div>
    </div>


  )
}

export default CaptainHome