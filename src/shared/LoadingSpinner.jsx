import React from 'react';

const LoadingSpinner = () => {
    return (
        <div>
            <div className='flex justify-center items-center h-[calc(100vh-68px)]'>
                <p className='text-7xl font-thin'></p>
                <div className='w-10 h-10 border-8 border-dotted rounded-full animate-spin mt-5 border-gray-600'></div>
                <p className='text-7xl font-thin'></p>
            </div>

        </div>
    );
};

export default LoadingSpinner;