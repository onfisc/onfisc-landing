import { ReactNode } from 'react';

interface MobileCarouselProps {
  items: ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function MobileCarousel({ items, currentIndex, onIndexChange }: MobileCarouselProps) {
  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden touch-pan-y">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={(e) => {
            const touchStart = e.touches[0].clientX;
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const touchEnd = endEvent.changedTouches[0].clientX;
              if (touchStart - touchEnd > 50) {
                onIndexChange((currentIndex + 1) % items.length);
              } else if (touchEnd - touchStart > 50) {
                onIndexChange((currentIndex - 1 + items.length) % items.length);
              }
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? 'bg-onfisc-orange w-8' : 'bg-onfisc-orange/30 w-2'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
