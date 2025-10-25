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

  // Fallback video if no trailerKey
  const youtubeUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`
    : "https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4";

  return (
    <PlayContainer>
      <div className="player">
        <div className="backArrow">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>

        {trailerKey ? (
          <iframe
            title="movie trailer"
            width="100%"
            height="100%"
            src={youtubeUrl}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <video src={youtubeUrl} autoPlay loop controls />
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

    video,
    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default Player;
