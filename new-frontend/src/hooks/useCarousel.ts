import { useEffect, useRef, useState } from 'react';

export function useCarousel(speed = 0, scrollAmount = 350) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isManualScrolling = useRef(false);
  const manualScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    checkScroll();
    scrollContainer.addEventListener('scroll', checkScroll);
    
    // Pro zachycení změny velikosti okna
    const observer = new ResizeObserver(checkScroll);
    observer.observe(scrollContainer);

    let animationFrameId: number;
    let isHovered = false;

    if (speed > 0) {
      const scroll = () => {
        if (!isHovered && scrollContainer && !isManualScrolling.current) {
          scrollContainer.scrollLeft += speed;
          
          // Pokud dojedeme na konec a auto-scroll je zapnutý
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
             // Zastaví se na konci (už žádný ping-pong nebo skákání)
          }
        }
        animationFrameId = requestAnimationFrame(scroll);
      };
      animationFrameId = requestAnimationFrame(scroll);
    }

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (speed > 0) cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('scroll', checkScroll);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    };
  }, [speed]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      isManualScrolling.current = true;
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
      
      const amount = direction === 'left' ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });

      manualScrollTimeout.current = setTimeout(() => {
        isManualScrolling.current = false;
        checkScroll();
      }, 600);
    }
  };

  return { scrollRef, scrollByAmount, canScrollLeft, canScrollRight };
}
