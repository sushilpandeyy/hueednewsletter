import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel3D({ images = [], height = "h-96", width = "w-full" }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use the provided images array length or default to 5 if empty
  const itemCount = images.length || 5;
  const radius = 300; // Distance from center to items

  useEffect(() => {
    // Initial setup of the carousel
    arrangeItems();
  }, []);

  const arrangeItems = () => {
    const items = carouselRef.current.querySelectorAll('.carousel-item');
    const angleStep = (2 * Math.PI) / items.length;
    
    items.forEach((item, i) => {
      // Calculate the position for each item in a perfect circle
      const angle = i * angleStep;
      
      // Position using sin and cos for a perfect circle
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      
      // Apply the transformation
      gsap.set(item, {
        x,
        z,
        opacity: i === currentIndex ? 1 : 0.5,
        scale: i === currentIndex ? 1 : 0.8
      });
    });
  };

  const rotateCarousel = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const items = carouselRef.current.querySelectorAll('.carousel-item');
    const newIndex = direction === 'right' 
      ? (currentIndex + 1) % itemCount 
      : (currentIndex - 1 + itemCount) % itemCount;
    
    const angleStep = (2 * Math.PI) / itemCount;
    
    // Animate all items to their new positions
    items.forEach((item, i) => {
      // Calculate the new angle for each item
      let offset = i - newIndex;
      if (direction === 'right') {
        // When going right, items move counter-clockwise
        offset = offset < 0 ? offset + itemCount : offset;
      } else {
        // When going left, items move clockwise
        offset = offset >= 0 ? offset : offset + itemCount;
      }
      
      const angle = offset * angleStep;
      
      // Calculate new x, z coordinates
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      
      // Animate to new position
      gsap.to(item, {
        x,
        z,
        opacity: i === newIndex ? 1 : 0.5,
        scale: i === newIndex ? 1 : 0.8,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: i === 0 ? () => {
          setCurrentIndex(newIndex);
          setIsAnimating(false);
        } : null
      });
    });
  };

  // Handle case where no images are provided
  const renderItems = () => {
    if (images.length === 0) {
      return [...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="carousel-item absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 transform-style-3d"
        >
          {/* Black div as placeholder */}
          <div 
            className="w-full h-full bg-black rounded-lg shadow-lg"
            style={{
              boxShadow: i === currentIndex ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
            }}
          />
        </div>
      ));
    }
    
    // Render actual images
    return images.map((image, i) => (
      <div 
        key={i} 
        className="carousel-item absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-69 transform-style-3d"
      >
        <img 
          src={image.src || image} 
          alt={image.alt || `Carousel item ${i+1}`}
          className="w-full h-full object-fit rounded-lg shadow-lg"
          style={{
            boxShadow: i === currentIndex ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
          }}
        />
      </div>
    ));
  };

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      {/* Carousel Container */}
      <div className={`relative w-full max-w-4xl ${height} flex items-center justify-center`}>
        {/* Left Arrow Button */}
        <button 
          onClick={() => rotateCarousel('left')}
          disabled={isAnimating}
          className="absolute left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full  transition-all duration-300"
          aria-label="Previous item"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Carousel Element */}
        <div className="relative h-full w-full perspective">
          <div 
            ref={carouselRef} 
            className="absolute inset-0 transform-style-3d"
          >
            {renderItems()}
          </div>
        </div>
        
        {/* Right Arrow Button */}
        <button 
          onClick={() => rotateCarousel('right')}
          disabled={isAnimating}
          className="absolute right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full   transition-all duration-300"
          aria-label="Next item"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* CSS for 3D transforms */}
      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}