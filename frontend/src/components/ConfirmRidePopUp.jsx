import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ConfirmRidePopUp({ 
    setConfirmRidePopUpPanel, // Updated prop name to match parent
    setRidePopUpPanel,
    ride  // Add ride prop
}) {
    const [otp, setOtp] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()
        // Handle OTP verification here if needed
        setConfirmRidePopUpPanel(false)
    }

    return (
        <div> 
            <h5 className='p-3 text-center absolute top-0 w-[93%]'
                onClick={() => setConfirmRidePopUpPanel(false)}>
                <i className='text-3xl ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 rounded-full object-cover w-10' src={ride?.user?.profilePic || 'default-avatar.png'} alt=''/>
                    <h2 className='text-lg font-medium'>{ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}</h2>
                </div>
                <div>
                    <h5 className='text-lg font-semibold'>{ride?.distance || '2.2'} KM</h5>
                </div>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-base text-grey-600'>{ride?.pickup || 'Loading...'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-base text-grey-600'>{ride?.destination || 'Loading...'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare || '0'}</h3>
                            <p className='text-base text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            type='text'  
                            className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mb-5"  
                            placeholder='Enter OTP'
                        />
                        <Link to='/captain-riding' 
                            className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-xl'
                        > 
                            Confirm
                        </Link>
                        <button 
                            type="button"
                            onClick={() => {
                                setConfirmRidePopUpPanel(false);
                                setRidePopUpPanel(false);
                            }} 
                            className='w-full mt-1 bg-red-500 text-lg text-white font-semibold p-3 rounded-lg'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp