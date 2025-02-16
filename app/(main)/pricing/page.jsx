import PricingModel from '@/components/custom/PricingModel';
import colors from '@/data/colors';
import Lookup from '@/data/Lookup';
import React from 'react';

function Pricing(){
    return(
        <div className='mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
           <h2 className='font-bold text-5xl'> Pricing</h2>
           <p className='text-gray-400 text-center max-w-xl mt-4'>{Lookup.PRICING_DESC}</p>

           <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center'
           style={{
            backgroundColor:colors.BACKGROUND
           }}>
            <h2 className='text-lg'><span className='font-bold'>500k</span> Tokens Left</h2>
            <div className=''>
                <h2 className='font-medium'>Need more tokens?</h2>
                <p>Upgrade your plan!</p>
            </div>
           </div>
           <PricingModel/>
        </div>
    )
}

export default Pricing;