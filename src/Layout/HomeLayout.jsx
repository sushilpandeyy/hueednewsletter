import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/common/NavBar.jsx'

const Home = ({ onOpenMenu }) => {
  return (
    <>
      <div className='w-screen overflow-x-hidden'>
       <div className='fixed top-0 z-50 w-screen'> 
         <NavBar onOpenMenu={onOpenMenu} />
       </div>
        <div className='absolute top-0'><Outlet/></div>
      </div>
    </>
  )
}

export default Home