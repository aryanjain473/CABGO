import React from 'react'

const LookingForDriver = (props) => {
    return(
        <div>
            <h5 className='p-3 text-centre absolute top-0 w-[93%]'
        onClick={()=>{
          props.setVehicleFound(false)
        }}><i className='text-3xl ri=arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

        <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src='https://i.pinimg.com/736x/aa/84/44/aa8444a02253f234590d8094b3e9cfd6.jpg' alt=''/>
        
            <div className='w-full mt-5'>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-base text-grey-600'>{props.pickup}</p>
                </div>
                </div>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-base text-grey-600'>{props.destination}</p>
                </div>
                </div>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>
                    <p className='text-base text-grey-600'>Cash Cash</p>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default LookingForDriver