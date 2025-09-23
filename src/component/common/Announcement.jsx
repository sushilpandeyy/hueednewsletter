import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../Fonts.css'

const Announcement = () => {

    const rowRef = useRef(null);

    useEffect(() => {
        if (rowRef.current) {
            let row_width = rowRef.current.getBoundingClientRect().width ;
            let row_item_width = rowRef.current.children[0].getBoundingClientRect().width ;
            let initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;

            gsap.set(rowRef.current, {
                xPercent: initial_offset
            });

            gsap.timeline().to(rowRef.current, {
                ease: "none",
                duration: 5,
                xPercent: 0,
                repeat: -1
            });
        }
    }, []);

    return (
        <section className="cb-tagreel w-full h-8 flex items-center relative bg-[#191919]" style={{ fontFamily: 'suisse' }}>
            <div className="cb-tagreel-content text-white ">
                <div className="cb-tagreel-items" role="marquee">
                    <div ref={rowRef} className="cb-tagreel-row uppercase">
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                        <div className="cb-tagreel-item flex gap-2 items-center"> <span className='w-1 h-1 bg-white rounded-full'></span><p className='text-[0.8vw] uppercase'>Now live - Drop 001</p></div>
                    
                        
                    </div>
                </div>
            </div>

            {/* Additional styles */}
            <style jsx >{`
                .cb-tagreel {
            position: relative;
            
        }

        .cb-tagreel-items {
            overflow: hidden;
        }

        .cb-tagreel-row {
            display: flex;
            position: relative;
            text-align: center;
            white-space: nowrap;
        }

        .cb-tagreel-item {
            position: relative;
            flex: 0 0 10%;
            padding: 0 0;
        }

        .cb-tagreel-item span {
            position: relative;
            display: inline-block;
            z-index: 1;
        }
            `}</style>
        </section>
    );
};

export default Announcement;