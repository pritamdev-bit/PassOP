import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <Navbar/>
      <div className='w-full h-1 bg-white'></div>
      <Manager/>
      <Footer/>
    </>
  )
}

export default App
