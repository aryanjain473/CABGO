import React from 'react'

const VehiclePanel = (props) => {
    return(
        <div>
        <h5 className='p-3 text-centre absolute top-0 w-[93%]'
        onClick={()=>{
          props.setVehiclePanel(false)
        }}><i className='text-3xl ri=arrow-down-wide-line'></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }}
              className='flex border-2 border-black rounded-xl w-full items-centre mb-2 justify-between'>
                <imgc className="h-12" src="https://static.vecteezy.com/system/resources/thumbnails/040/963/391/small/ai-generated-hyundai-car-transparent-background-generative-ai-free-png.png" alt=""/>
                <div className='w-1/2'>
                  <h4 className='font-medium text-base'>CabGo <span><i className='ri-user-3-fill'></i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-medium text-xs text-grey-600'>Affordable, compact rides</p>
                  <h2 className='text-2xl font-semibold'>$193</h2>
                </div>
              </div>
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }}
               className='flex border-2 border-black rounded-xl w-full items-centre mb-2 justify-between'>
                <imgc className="h-12" src="https://i.pinimg.com/736x/aa/84/44/aa8444a02253f234590d8094b3e9cfd6.jpg" alt=""/>
                <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>CabGo <span><i className='ri-user-3-fill'></i></span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-medium text-xs text-grey-600'>Affordable, compact rides</p>
                  <h2 className='text-2xl font-semibold'>$193</h2>
                </div>
              </div>
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }}
               className='flex border-2 border-black rounded-xl w-full items-centre mb-2 justify-between'>
                <imgc className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt=""/>
                <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>CabGo <span><i className='ri-user-3-fill'></i>1</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-medium text-xs text-grey-600'>Affordable, compact rides</p>
                  <h2 className='text-2xl font-semibold'>$193</h2>
                </div>
              </div>
      </div>
    )
}

export default VehiclePanel