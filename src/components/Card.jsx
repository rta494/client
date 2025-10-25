import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

export default function Card({ movieData }) {
  const [hover, setHover] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

  // Fetch trailer for the movie
  useEffect(() => {
    if (movieData.id) {
      const fetchTrailer = async () => {
        try {
          const { data } = await axios.get(
            `${TMDB_BASE_URL}/movie/${movieData.id}/videos?api_key=${MY_API_KEY}&language=en-US`
          );
          const trailer = data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          setTrailerKey(trailer ? trailer.key : null);
        } catch {
          setTrailerKey(null);
        }
      };
      fetchTrailer();
    }
  }, [movieData.id]);

  return (
    <CardContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name}
        loading="lazy"
        onClick={() => navigate(`/player?trailer=${trailerKey || ""}`)}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />

      {hover && (
        <HoverCard>
          {trailerKey ? (
            <iframe
              title="trailer"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              frameBorder="0"
              allow="autoplay; fullscreen"
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

          <div className="info">
            <h3 onClick={() => navigate(`/player?trailer=${trailerKey || ""}`)}>
              {movieData.name}
            </h3>
            <div className="genres">{movieData.genres.join(", ")}</div>
          </div>
        </HoverCard>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 0.3rem;
  }
`;

const HoverCard = styled.div`
  position: absolute;
  top: -250px;
  left: 0;
  width: 200px;
  background: #181818;
  border-radius: 0.3rem;
  color: white;
  padding: 0.5rem;
  z-index: 10;

  img,
  iframe {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 0.2rem;
  }

  .info {
    margin-top: 0.5rem;

    h3 {
      font-size: 1rem;
      margin: 0.3rem 0;
      cursor: pointer;
    }

    .genres {
      font-size: 0.8rem;
      color: #b8b8b8;
    }
  }
`;
