import React from "react"
import { Link } from "react-router-dom"

const Riding = () => {
    return(
        <div className="h-screen">
            <Link to='/home' className="fixed h-10 w-10 b-white flex items-centre justify-centre rounded-full top-2 right-2">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2">
            <img className='h-full w-full object-cover' src='https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg' alt=''/>

            </div>
            <div className="h-1/2 p4">
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
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>$193</h3>
                    <p className='text-base text-grey-600'>Cash Cash</p>
                </div>
                </div>
            </div>
        </div>
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl">Make a Payment</button>

            </div>
        </div>
    )
}
export default Riding