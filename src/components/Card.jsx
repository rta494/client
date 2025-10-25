import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

export default React.memo(function Card({ movieData }) {
  const [hoverCardVisible, setHoverCardVisible] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [trailerKey, setTrailerKey] = useState(null);
  const cardRef = useRef();
  const hoverRef = useRef();
  const navigate = useNavigate();

  // Preload hover image
  useEffect(() => {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w500${movieData.image}`;
  }, [movieData.image]);

  useEffect(() => {
    if (movieData.id) {
      const fetchTrailer = async () => {
        try {
          const { data } = await axios.get(
            `${TMDB_BASE_URL}/movie/${movieData.id}/videos?api_key=${MY_API_KEY}&language=en-US`
          );
          const trailer = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
          setTrailerKey(trailer ? trailer.key : null);
        } catch (err) {
          setTrailerKey(null);
        }
      };
      fetchTrailer();
    }
  }, [movieData.id]);

  const handleMouseMove = (e) => {
    if (cardRef.current && hoverCardVisible) {
      const hoverWidth = Math.min(400, window.innerWidth - 20);
      const hoverHeight = 300;
      let left = e.clientX - hoverWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - hoverWidth - 10));
      const rect = cardRef.current.getBoundingClientRect();
      let top = rect.top - hoverHeight - 10;
      if (top < 10) top = rect.bottom + 10;
      setHoverPosition({ top, left });
    }
  };

  const handleMouseEnter = () => setHoverCardVisible(true);

  const handleMouseLeave = (e) => {
    if (
      !e.relatedTarget ||
      !hoverRef.current ||
      !(e.relatedTarget instanceof Node) ||
      !hoverRef.current.contains(e.relatedTarget)
    ) {
      setHoverCardVisible(false);
    }
  };

  const handleHoverCardMouseLeave = (e) => {
    if (
      !e.relatedTarget ||
      !cardRef.current ||
      !(e.relatedTarget instanceof Node) ||
      !cardRef.current.contains(e.relatedTarget)
    ) {
      setHoverCardVisible(false);
    }
  };

  return (
    <>
      <CardContainer
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie poster"
          loading="eager"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
          onClick={() => navigate(`/player?trailer=${trailerKey}`)}
        />
      </CardContainer>

      {hoverCardVisible &&
        ReactDOM.createPortal(
          <HoverCard
            ref={hoverRef}
            style={{ top: hoverPosition.top, left: hoverPosition.left }}
            onMouseLeave={handleHoverCardMouseLeave}
            onMouseEnter={() => setHoverCardVisible(true)}
          >
            <div className="image-video-wrapper">
              {trailerKey ? (
                <iframe
                  title="movie trailer"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                  alt="movie poster"
                  loading="eager"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
              )}
            </div>

            <div className="info-container">
              <h3 onClick={() => navigate(`/player?trailer=${trailerKey}`)}>
                {movieData.name}
              </h3>
              <div className="icons">
                <div className="controls">
                  <IoPlayCircleSharp className="hover-icon" title="play" />
                  <RiThumbUpFill className="hover-icon" title="like" />
                  <RiThumbDownFill className="hover-icon" title="dislike" />
                  <BsCheck className="hover-icon" title="Remove from List" />
                  <AiOutlinePlus
                    className="hover-icon"
                    title="Add to my List"
                  />
                </div>
              </div>
              <div className="genres">
                <ul>
                  {movieData.genres.map((genre, idx) => (
                    <li key={idx}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </HoverCard>,
          document.body
        )}
    </>
  );
});

const CardContainer = styled.div`
  flex: 0 0 auto;
  max-width: 320px;
  width: 100%;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 0.3rem;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1024px) {
    max-width: 260px;
  }
  @media (max-width: 768px) {
    max-width: 180px;
  }
  @media (max-width: 480px) {
    max-width: 140px;
  }
`;

const HoverCard = styled.div`
  position: fixed;
  width: 90%;
  max-width: 400px;
  background-color: #181818;
  border-radius: 0.3rem;
  z-index: 9999;
  overflow: hidden;

  .image-video-wrapper {
    width: 100%;
    height: 300px;
    overflow: hidden;
    img,
    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 1024px) {
      height: 250px;
    }
    @media (max-width: 768px) {
      height: 200px;
    }
    @media (max-width: 480px) {
      height: 150px;
    }
  }

  .info-container {
    padding: 1rem;
    color: white;
    h3 {
      font-weight: bold;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }

  .icons .controls .hover-icon {
    font-size: 3rem; /* base size */
    color: white;
    cursor: pointer;
    transition: font-size 0.3s ease;

    &:hover {
      color: #b8b8b8;
    }

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .genres ul {
    list-style: none; /* removes bullets */
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    padding: 0;
    margin: 0;
  }

  .genres ul li {
    font-size: 0.95rem;
  }
`;
