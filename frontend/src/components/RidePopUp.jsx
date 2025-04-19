import React from 'react';

const RidePopUp = (props) => {
    return (
        <div> 
        <h5 className='p-3 text-center absolute top-0 w-[93%]'
    onClick={()=>{
      props.setRidePopUpPanel(false)
    }}><i className='text-3xl ri-arrow-down-wide-line'></i></h5>
        <h3 className='text-2xl font-semibold mb-5 '>New Ride Available!</h3>
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
<div className='flex mt-5 w-full items-center justify-between'>
<button onClick={()=>{
            props.setRidePopUpPanel(false)
        }} className='mt-1 bg-gray-200 text-gray-700 font-semibold p-3 px-10 rounded-xl'>Ignore</button>
        <button onClick={()=>{
          props.setConfirmRidePopUpPanel(true); 
            
      }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-xl'>Accept</button>
 
      
        </div>
    </div>
    </div>
    
    );
}

export default RidePopUp;
