import React from 'react'

const Footer = () => {
    return (
        <footer className='flex flex-col items-center bg-emerald-800 text-white w-full'>
            <div className="logo font-bold text-xl">
                <span>&lt;</span>
                <span className='text-black'>Pass</span><span>OP</span>
                <span>/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                <span>Created with</span>
                <img src="./heart-svg.svg" alt="heart" width={30}/>   
                <span>by Pritam</span>
            </div>
        </footer>
    )
}

export default Footer
