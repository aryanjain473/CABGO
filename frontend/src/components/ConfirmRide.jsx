import React from 'react'

const ConfirmRide = ({ 
  pickup, 
  destination, 
  fare, 
  vehicleType, 
  setVehicleFound, 
  setConfirmRidePanel,
  createRide 
}) => {
  return (
    <div>
      <h5 className='p-3 text-center absolute top-0 w-[93%]'
          onClick={() => setConfirmRidePanel(false)}>
        <i className='text-3xl ri-arrow-down-wide-line'></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src='https://i.pinimg.com/736x/aa/84/44/aa8444a02253f234590d8094b3e9cfd6.jpg' alt=''/>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-line"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base text-grey-600'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-line"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base text-grey-600'>{destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{fare && vehicleType ? fare[vehicleType] : '0'}</h3>
              <p className='text-base text-grey-600'>Cash Payment</p>
            </div>
          </div>
        </div>
        <button 
          onClick={async () => {
            try {
              await createRide();
              setVehicleFound(true);
              setConfirmRidePanel(false);
            } catch (error) {
              console.error('Error creating ride:', error);
              // Optionally show error to user
              alert('Failed to create ride. Please try again.');
            }
          }} 
          className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl'
          disabled={!fare || !vehicleType}
        >
          Confirm your Ride
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide