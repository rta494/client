import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Card({ movieData }) {
  const [hoverCardVisible, setHoverCardVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <CardContainer
      onMouseEnter={() => setHoverCardVisible(true)}
      onMouseLeave={() => setHoverCardVisible(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name}
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
        onClick={() =>
          navigate(`/player?trailer=${movieData.trailerKey || ""}`)
        }
      />

      {hoverCardVisible && (
        <HoverCard>
          <div className="image-wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt={movieData.name}
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x450?text=No+Image";
              }}
            />
          </div>
          <div className="info-container">
            <h3
              onClick={() =>
                navigate(`/player?trailer=${movieData.trailerKey || ""}`)
              }
            >
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
    </CardContainer>
  );
}

const CardContainer = styled.div`
  flex: 0 0 auto;
  width: 150px;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 0.3rem;
    display: block;
  }

  @media (min-width: 480px) {
    width: 180px;
  }
  @media (min-width: 768px) {
    width: 220px;
  }
  @media (min-width: 1024px) {
    width: 250px;
  }
`;

const HoverCard = styled.div`
  position: absolute;
  top: -310px;
  left: 0;
  width: 100%;
  max-width: 250px;
  background-color: #181818;
  border-radius: 0.3rem;
  color: white;
  padding: 0.5rem;
  z-index: 10;

  .image-wrapper img {
    width: 100%;
    border-radius: 0.2rem;
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
