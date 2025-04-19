import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ConfirmRidePopUp(props) {
    const [otp, setOtp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <div> 
    <h5 className='p-3 text-center absolute top-0 w-[93%]'
onClick={()=>{
  props.setRidePopUpPanel(false)
}}><i className='text-3xl ri-arrow-down-wide-line'></i></h5>
    <h3 className='text-2xl font-semibold mb-5 '>Confirm this ride to start</h3>
<div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
    <div className='flex items-center gap-3 '>
    <img className='h-10 rounded-full object-cover w-10' src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww' alt=''/>
    <h2 className='text-lg font-medium'>Abhay Patil</h2>
    </div>
    <div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>
</div>
<div className='flex gap-2 justify-between flex-col items-center'>
    <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className="text-lg ri-map-pin-2-line"></i>
        <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-base text-grey-600'>randomAddress,Random</p>
        </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className="text-lg ri-map-pin-2-line"></i>
        <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-base text-grey-600'>randomAddress,Random</p>
        </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className="ri-currency-line"></i>
        <div>
            <h3 className='text-lg font-medium'>$193</h3>
            <p className='text-base text-gray-600'>Cash Cash</p>
        </div>
        </div>
    </div>
    
    <div className='mt-6 w-full'>
   <form onSubmit={(e)=> {
    submitHandler(e)
   }}>
    <input value={otp} onChange={(e) => setOtp(e.target.value)} type='text'  className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mb-5"  placeholder='Enter OTP '></input>
     <Link to='/captain-riding' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-xl'> Confirm</Link>

<button onClick={()=>{
     props.setConfirmRidePopUpPanel(false)
     props.setRidePopUpPanel(false)
 }} className='w-full mt-1 bg-red-500 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button></form>
    </div>
</div>
</div>
  )
}

export default ConfirmRidePopUp