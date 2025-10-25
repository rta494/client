import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function MovieSlider({ data, title }) {
  const listRef = useRef();
  const [controlVisible, setControlVisible] = useState(false);
  const CARD_WIDTH = 210; // width + gap

  const scroll = (direction) => {
    if (!listRef.current) return;
    listRef.current.scrollBy({
      left: direction === "right" ? CARD_WIDTH : -CARD_WIDTH,
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
          className={`slider-action left ${controlVisible ? "" : "hidden"}`}
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
          className={`slider-action right ${controlVisible ? "" : "hidden"}`}
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

      /* Netflix-style snapping */
      scroll-snap-type: x mandatory;

      & > * {
        flex: 0 0 auto;
        scroll-snap-align: start;
      }

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
`;
