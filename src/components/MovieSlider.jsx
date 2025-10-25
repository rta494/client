import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function MovieSlider({ data, title }) {
  const listRef = useRef();
  const [controlVisible, setControlVisible] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(210);

  // For touch events
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateScrollAmount = () => {
      const firstCard = listRef.current?.children[0];
      if (firstCard) {
        setScrollAmount(firstCard.offsetWidth + 10); // card width + gap
      }
    };
    updateScrollAmount();
    window.addEventListener("resize", updateScrollAmount);
    return () => window.removeEventListener("resize", updateScrollAmount);
  }, [data]);

  const scroll = (direction) => {
    if (!listRef.current) return;
    listRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      scroll(delta > 0 ? "right" : "left");
    }
  };

  return (
    <Container
      onMouseEnter={() => setControlVisible(true)}
      onMouseLeave={() => setControlVisible(false)}
    >
      <h2>{title}</h2>
      <div
        className="slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={`slider-action left ${!controlVisible ? "hidden" : ""}`}
          onClick={() => scroll("left")}
        >
          <AiOutlineLeft />
        </button>

        <div className="slider" ref={listRef}>
          {data.map((movie) => (
            <Card key={movie.id} movieData={movie} />
          ))}
        </div>

        <button
          className={`slider-action right ${!controlVisible ? "hidden" : ""}`}
          onClick={() => scroll("right")}
        >
          <AiOutlineRight />
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem 0;
  position: relative;

  h2 {
    margin-left: 1rem;
    color: white;
    font-size: 1.2rem;
  }

  .slider-wrapper {
    position: relative;
    overflow: hidden;
    padding: 1rem 0;

    .slider {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-left: 1rem;
      scroll-behavior: smooth;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .slider-action {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 35px;
      height: 60px;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.3rem;

      svg {
        color: white;
        font-size: 1.5rem;
      }

      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
      &.hidden {
        display: none;
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    h2 {
      font-size: 1.1rem;
    }
    .slider-action {
      width: 30px;
      height: 50px;
      svg {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1rem;
    }
    .slider-action {
      width: 25px;
      height: 40px;
      svg {
        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 0.9rem;
    }
    .slider-action {
      width: 20px;
      height: 35px;
      svg {
        font-size: 1rem;
      }
    }
  }
`;
