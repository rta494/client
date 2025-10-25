import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function MovieSlider({ data, title }) {
  const listRef = useRef();
  const [controlVisible, setControlVisible] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  // Dynamically calculate card width
  useEffect(() => {
    const updateCardWidth = () => {
      if (listRef.current && listRef.current.children.length > 0) {
        const firstCard = listRef.current.children[0];
        setCardWidth(firstCard.offsetWidth + 10); // include gap
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [data]);

  const scroll = (direction) => {
    if (!listRef.current) return;
    listRef.current.scrollBy({
      left: direction === "right" ? cardWidth * 2 : -cardWidth * 2, // scroll 2 cards at a time
      behavior: "smooth",
    });
  };

  return (
    <Container
      onMouseEnter={() => setControlVisible(true)}
      onMouseLeave={() => setControlVisible(false)}
    >
      <h2>{title}</h2>
      <div className="slider-wrapper">
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
    font-size: 1.5rem;
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
      width: 40px;
      height: 70px;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.3rem;

      svg {
        color: white;
        font-size: 1.8rem;
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

  @media (max-width: 1024px) {
    .slider-wrapper .slider-action {
      width: 35px;
      height: 60px;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 768px) {
    .slider-wrapper .slider-action {
      width: 30px;
      height: 50px;
      svg {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.2rem;
      margin-left: 0.5rem;
    }
    .slider-wrapper .slider-action {
      width: 25px;
      height: 40px;
      svg {
        font-size: 1rem;
      }
    }
  }
`;
