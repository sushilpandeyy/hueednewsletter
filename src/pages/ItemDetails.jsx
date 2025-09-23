import { useRef, useState, useEffect } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { TbCircleDotted, TbHeart } from "react-icons/tb";
import { Md360 } from "react-icons/md";

import '../Fonts.css'

import Carousel3D from '../component/common/Carousel';


const ItemDetails = () => {

    const images = [
        '/item1.png',
        '/iteml.png',
        '/itemr.png',
    ]


    return (
        <>

            <div className="flex min-h-screen h-screen w-screen ">
                {/* filters*/}
                <div className=" h-full w-1/4 relative">


                    {/* border */}
                    <div className="absolute top-0 bottom-0 right-0 w-[0.1vw]">
                        <div className="h-full w-full flex flex-col">
                            <div className="flex-1 bg-gradient-to-b from-transparent to-gray-500"></div>
                            <div className="w-full bg-gray-500"></div>
                            <div className="flex-1 bg-gradient-to-t from-transparent to-gray-500"></div>
                        </div>
                    </div>


                    {/* filters & sort by */}

                    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>


                        {/* filters */}
                        <div className='w-full  items-center flex flex-col gap-2'>
                            <h3 className='text-2xl'>Filter</h3>

                            <div className='px-5 w-full flex flex-col gap-2'>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Drops</p> <span><AiOutlinePlus /></span></div>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Tops</p> <span><AiOutlinePlus /></span></div>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Bottoms</p> <span><AiOutlinePlus /></span></div>

                            </div>

                        </div>

                        {/* sort by */}
                        <div className='w-full  items-center flex flex-col gap-2'>
                            <h3 className='text-2xl'>Sort By</h3>

                            <div className='px-5 w-full flex flex-col gap-2'>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Drops</p> <span><TbCircleDotted /></span></div>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Tops</p> <span><TbCircleDotted /></span></div>
                                <div className='w-full bg-[#F0F0F0] py-3 px-5 flex justify-between items-center  '> <p className='uppercase font-semibold'>Bottoms</p> <span><TbCircleDotted /></span></div>

                            </div>
                        </div>
                    </div>
                </div>



                {/* item display */}
                <div className="h-full w-2/4 flex flex-col justify-center items-center">
                    <div className='w-full flex flex-col items-center justify-center'>
                        <p className=''>Shop</p>
                        <h3 className='uppercase'>SKY BLUE</h3>
                        <p className='uppercase'>calm</p>
                    </div>


                    <div className='h-auto w-full '>
                        <Carousel3D images={images} />
                    </div>

                    <div className='relative pt-10'>
                        <div className='absolute left-1/2 -translate-x-1/2 text-xl'><Md360 /></div>
                    </div>



                    <div className='w-full flex flex-col items-center justify-center mt-10'>
                        <div>Embroidered Trench Coat</div>

                        <div className='flex gap-5'><p className='uppercase'>Rs</p> <p>35,000</p></div>
                    </div>
                </div>



                {/* item details */}
                <div className="h-full w-1/4 relative">


                    {/* border */}
                    <div className="absolute top-0 bottom-0  w-[0.1vw]">
                        <div className="h-full w-full flex flex-col">
                            <div className="flex-1 bg-gradient-to-b from-transparent to-gray-500"></div>
                            <div className="w-full bg-gray-500"></div>
                            <div className="flex-1 bg-gradient-to-t from-transparent to-gray-500"></div>
                        </div>
                    </div>


                    {/* story */}


                    <div className='h-full w-full flex flex-col  gap-10 justify-center px-5'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='uppercase'>Story</h3>
                            <p className='font-sans'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, eget tincidunt nisl nunc eget lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc egestas nunc, eget tincidunt nisl nunc eget lorem.</p>
                        </div>

                        <div className='flex flex-col gap-5' >
                            {/* size chart */}
                            <div className='flex flex-col gap-2'>
                                <h3 className='uppercase underline'>size chart</h3>

                                <div className='bg-[#F0F0F0] flex px-5 py-5 gap-2 justify-between '>
                                    <button>S</button>
                                    <button>M</button>
                                    <button>L</button>
                                    <button>XL</button>
                                    <button>XXL</button>
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex gap-5'>
                                <button className='bg-black text-white w-full text-xl'>Add To Cart</button>
                                <button className='bg-black px-5 py-5 text-xl'><TbHeart color='white' /></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetails