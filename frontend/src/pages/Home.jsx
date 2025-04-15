import React from 'react'
import { useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import VehiclePanel from '../components/VehiclePanel';
import LookingForDriver from '../components/LookingForDriver';

const Home = () => {
  const [pickup,setPickup] = useState('')
  const [destination,setDestination] = useState('')
  const [panelOpen,setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [confirmRidePanel,setConfirmRidePanel] = useState(false)
  const [vehicleFound,setVehicleFound] = useState(false)
  const [waitingForDriver,setWaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    }
  
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {
        height:'70%',
        padding:24
        //opacity:1
       })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })}
       else{
        gsap.to(panelRef.current, {
          height:'0%',
          padding:0
          //opacity:0
         })
         gsap.to(panelCloseRef.current,{
          opacity:0
        })
       }
    }
  , [panelOpen])
  
  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function(){
    if(waitingForDriverd){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src="Cabgo.png" alt="Cabgo" className='w-16 absolute left-5 top-5' />

      <div onClick={()=>{
        setVehiclePanel(false)
      }} className='w- screen h-screen'>
        <img className='h-full w-full object-cover' src='https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg' alt=''/>
      </div>

      <div className='bg-white flex flex-col justify-end h-screen absolute top-0 w-full p-5'>
          <div className='h-[30%] p-5 by-white relative'>
            <h5
            ref={panelCloseRef}
            onClick={() =>{ 
              setPanelOpen(False)}}
            className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i class="ri-arrow-down-wide-line"></i>
            </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => 
            submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-grey-700 rounded-full"></div>
            <input 
            onClick={() =>{ 
              setPanelOpen(True)}}
            value={pickup}
            onChange={(e) =>{ setPickup(e.target.value)}}
            type="text" 
            placeholder='Add a pick-up location' 
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-5' />

            <input 
            onClick={() =>{ 
              setPanelOpen(True)}}
            value={destination}
            onChange={(e) =>{ setDestination(e.target.value)}}
            type="text" 
            placeholder='Enter a destination' 
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-5' />
            <button type='submit'>Find</button>
          </form>
          </div>
          <div ref= {panelRef} className=' bg-white h-0'>
              <LocationSearchPanel  setPanelOpen={setPanelOpen} vehiclePanelOpen={vehiclePanelOpen} />
          </div>
      </div>
      <div ref={vehiclePanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-12'>
        <waitingForDriver waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home