import React from 'react'
import { Outlet } from 'react-router-dom'
import ProductMenu from '../component/shop/ProductMenu'
import Footer from '../component/Landing/Footer'

const Shop = ({ onOpenMenu }) => {
  return (
    <>
      <div className='w-screen overflow-x-hidden bg-[#EFEFEF]'>
        <div className='fixed top-0 w-full z-20 '>
          <ProductMenu onOpenMenu={onOpenMenu} />
        </div>
        <Outlet />
        <Footer/>
      </div>
    </>
  )
}

export default Shop