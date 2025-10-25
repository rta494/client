import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

export default function Card({ movieData }) {
  const [hoverCardVisible, setHoverCardVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `${TMDB_BASE_URL}/movie/${movieData.id}/videos?api_key=${MY_API_KEY}&language=en-US`
        );
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch {
        setTrailerKey(null);
      }
    };

    if (movieData.id) fetchTrailer();
  }, [movieData.id]);

  const handleMouseEnter = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 310 > 0 ? rect.top - 310 : rect.bottom + 10,
        left: rect.left,
      });
    }
    setHoverCardVisible(true);
  };

  const handleMouseLeave = () => {
    setHoverCardVisible(false);
  };

  return (
    <>
      <CardContainer
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt={movieData.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
          onClick={() => navigate(`/player?trailer=${trailerKey || ""}`)}
        />
      </CardContainer>

      {hoverCardVisible && (
        <HoverCard style={{ top: position.top, left: position.left }}>
          <div className="image-wrapper">
            {trailerKey ? (
              <iframe
                title={movieData.name}
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt={movieData.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
            )}
          </div>
          <div className="info-container">
            <h3 onClick={() => navigate(`/player?trailer=${trailerKey || ""}`)}>
              {movieData.name}
            </h3>
            <div className="icons">
              <span>▶</span>
              <span>👍</span>
              <span>👎</span>
              <span>✔</span>
              <span>＋</span>
            </div>
            <div className="genres">
              <ul>
                {movieData.genres.map((genre, idx) => (
                  <li key={idx}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </HoverCard>
      )}
    </>
  );
}

const CardContainer = styled.div`
  flex: 0 0 auto;
  width: 18%;
  min-width: 180px;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 0.3rem;
    display: block;
  }

  @media (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 1024px) {
    width: 22%;
  }
  @media (max-width: 768px) {
    width: 28%;
  }
  @media (max-width: 480px) {
    width: 40%;
  }
`;

const HoverCard = styled.div`
  position: fixed;
  width: 250px;
  max-width: 90%;
  background-color: #181818;
  border-radius: 0.3rem;
  color: white;
  padding: 0.5rem;
  z-index: 9999;

  .image-wrapper {
    width: 100%;
    height: 170px;

    img,
    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.2rem;
    }
  }

  .info-container {
    margin-top: 0.5rem;

    h3 {
      font-size: 1rem;
      font-weight: bold;
      margin: 0.3rem 0;
      cursor: pointer;
    }

    .icons span {
      margin-right: 5px;
      cursor: pointer;
    }

    .genres ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  }
`;
