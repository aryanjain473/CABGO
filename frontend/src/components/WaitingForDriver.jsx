import React from 'react'

const WaitingForDriver = (props) => {
    return(
        <div>
            <h5 className='p-3 text-centre absolute top-0 w-[93%]'
        onClick={()=>{
          props.setVehiclePanel(false)
        }}><i className='text-3xl ri=arrow-down-wide-line'></i></h5>
        <div className='flex items-centre justify-between'>
        <img className='h-12' src='https://i.pinimg.com/736x/aa/84/44/aa8444a02253f234590d8094b3e9cfd6.jpg' alt=''/>
        <div className='text-right'>
            <h2 className='text-lg font-medium'>Arun</h2>
            <h4 className='text-lg font-semibold -mt-1 -mb-1'>MH04 AB 1234</h4>
            <p className='text-sm text-grey-600'>Maruti Suzuki Alti</p>
        </div>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
        
            <div className='w-full mt-5'>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-base text-grey-600'>randomAddress,Random</p>
                </div>
                </div>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-base text-grey-600'>randomAddress,Random</p>
                </div>
                </div>
                <div className='flex items-centre gap-5 p-3 border-b-2'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>$193</h3>
                    <p className='text-base text-grey-600'>Cash Cash</p>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default WaitingForDriver