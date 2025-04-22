import React from 'react'


const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center absolute top-0 w-[93%]'
        onClick={() => {
          props.setVehiclePanel(false)
        }}>
        <i className='text-3xl ri-arrow-down-wide-line'></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      
   
        
          <div onClick={() => props.setConfirmRidePanel(true)} 
               className='flex border-2 border-black rounded-xl w-full items-center mb-2 justify-between'>
            
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>CabGo Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs text-grey-600'>Affordable, compact rides</p>
              <h2 className='text-2xl font-semibold'>₹{props.fare.auto}</h2>
            </div>
          </div>

          <div onClick={() => props.setConfirmRidePanel(true)}
               className='flex border-2 border-black rounded-xl w-full items-centre mb-2 justify-between'>
          
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>CabGo Car <span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-medium text-xs text-grey-600'>Comfortable sedan rides</p>
              <h2 className='text-2xl font-semibold'>₹{props.fare.car}</h2>
            </div>
          </div>

          <div onClick={() => props.setConfirmRidePanel(true)}
               className='flex border-2 border-black rounded-xl w-full items-centre mb-2 justify-between'>
          
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>CabGo Bike <span><i className='ri-user-3-fill'></i>1</span></h4>
              <h5 className='font-medium text-sm'>1 min away</h5>
              <p className='font-medium text-xs text-gray-600'>Quick bike rides</p>
              <h2 className='text-2xl font-semibold'>₹{props.fare.moto}</h2>
            </div>
          </div>
        
        (
        <div className="text-center text-gray-500">
         <h2 className='text-lg font-semibold'>{props.fare.moto}</h2>
        </div>
      )
    </div>
  );
};

export default VehiclePanel