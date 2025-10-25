import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default React.memo(function MovieSlider({ data, title }) {
  const listRef = useRef();
  const [controlVisibility, setControlVisibility] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      const cardWidth = listRef.current.children[0]?.offsetWidth || 320;
      const gap = 10;
      setSlideWidth(cardWidth + gap);
    }
    const handleResize = () => {
      if (listRef.current) {
        const cardWidth = listRef.current.children[0]?.offsetWidth || 320;
        const gap = 10;
        setSlideWidth(cardWidth + gap);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  const handleDirection = (direction) => {
    if (!listRef.current) return;
    const scrollAmount = slideWidth;

    if (direction === "left") {
      listRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Container
      onMouseEnter={() => setControlVisibility(true)}
      onMouseLeave={() => setControlVisibility(false)}
    >
      <h2>{title}</h2>
      <div className="slider-wrapper">
        <button
          className={`slider-action left ${!controlVisibility ? "hidden" : ""}`}
          onClick={() => handleDirection("left")}
        >
          <AiOutlineLeft />
        </button>

        <div className="slider" ref={listRef}>
          {data.map((movie) => (
            <Card key={movie.id} movieData={movie} />
          ))}
        </div>

        <button
          className={`slider-action right ${
            !controlVisibility ? "hidden" : ""
          }`}
          onClick={() => handleDirection("right")}
        >
          <AiOutlineRight />
        </button>
      </div>
    </Container>
  );
});

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
      padding-left: 1rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;

      scroll-snap-type: x mandatory; /* Netflix-style snap */

      & > * {
        flex: 0 0 auto;
        scroll-snap-align: start; /* each card snaps */
      }

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .slider-action {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 50px;
      height: 100px;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.3rem;

      svg {
        color: white;
        font-size: 2rem;
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
    h2 {
      margin-left: 0.5rem;
      font-size: 1.3rem;
    }
    .slider-wrapper .slider-action {
      width: 40px;
      height: 80px;
      svg {
        font-size: 1.8rem;
      }
    }
  }

  @media (max-width: 768px) {
    .slider-wrapper .slider-action {
      width: 35px;
      height: 60px;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 480px) {
    .slider-wrapper {
      .slider {
        padding-left: 0.5rem;
      }
      .slider-action {
        width: 30px;
        height: 50px;
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }
`;
