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
      let exactScroll = scrollContainer.scrollLeft;
      let currentDirection = 1; // 1 pro pohyb doprava, -1 pro pohyb doleva
      
      const scroll = () => {
        if (!isHovered && scrollContainer && !isManualScrolling.current) {
          exactScroll += speed * currentDirection;
          scrollContainer.scrollLeft = exactScroll;
          
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          // Ping-pong logika: Pokud dojedeme na konec, otočíme směr
          if (maxScroll > 10) {
            // Použijeme < 1 místo <= 1, aby se to nezasekávalo kvůli zaokrouhlení
            if (currentDirection === 1 && scrollContainer.scrollLeft >= maxScroll - 2) {
              currentDirection = -1; // jedeme doleva
            } else if (currentDirection === -1 && scrollContainer.scrollLeft <= 1) {
              currentDirection = 1; // jedeme doprava
            }
          }
        } else if (scrollContainer) {
          // Pokud stojíme, updatujeme exactScroll z aktuální pozice pro jistotu
          exactScroll = scrollContainer.scrollLeft;
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
