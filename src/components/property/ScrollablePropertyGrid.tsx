import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PropertyGrid = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem; /* Add some padding for scrollbar */
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity; /* Enable scroll snapping with proximity */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ArrowButton = styled.button<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: -20px; /* Adjust position as needed */
`;

const RightArrow = styled(ArrowButton)`
  right: -20px; /* Adjust position as needed */
`;

interface ScrollablePropertyGridProps {
  children: React.ReactNode;
}

const ScrollablePropertyGrid: React.FC<ScrollablePropertyGridProps> = ({ children }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrowsVisibility = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (gridRef.current) {
      const cardWidth = 200; // From PropertyCard.tsx
      const gap = 32; // 2rem
      const scrollAmount = (cardWidth + gap) * 7; // Scroll by 7 cards + gaps

      if (direction === 'left') {
        gridRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', checkArrowsVisibility);
      const resizeObserver = new ResizeObserver(checkArrowsVisibility);
      resizeObserver.observe(gridElement);

      checkArrowsVisibility(); // Initial check

      return () => {
        gridElement.removeEventListener('scroll', checkArrowsVisibility);
        resizeObserver.disconnect();
      };
    }
  }, [children]);

  return (
    <ScrollContainer>
      <LeftArrow $visible={showLeftArrow} onClick={() => scroll('left')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </LeftArrow>
      <PropertyGrid ref={gridRef}>
        {children}
      </PropertyGrid>
      <RightArrow $visible={showRightArrow} onClick={() => scroll('right')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </RightArrow>
    </ScrollContainer>
  );
};

export default ScrollablePropertyGrid;

