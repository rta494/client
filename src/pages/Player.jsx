import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get query param "trailer"
  const searchParams = new URLSearchParams(location.search);
  const trailerKey = searchParams.get("trailer");

  return (
    <PlayContainer>
      <div className="player">
        <div className="backArrow">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>

        {trailerKey && trailerKey !== "none" ? (
          <iframe
            title="movie trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="no-video">No video trailer available</div>
        )}
      </div>
    </PlayContainer>
  );
};

const PlayContainer = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: black;

    .backArrow {
      position: absolute;
      padding: 2rem;
      z-index: 10;
      svg {
        font-size: 3rem;
        cursor: pointer;
        color: white;
      }
    }

    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-video {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 2rem;
      text-align: center;
      padding: 2rem;
    }
  }
`;

export default Player;
