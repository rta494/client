import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TopNav from "../components/TopNav";
import SliderContainer from "../components/SliderContainer";
import { fetchMovies, getGenres } from "../store";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded, dispatch]);

  // Random hero movie
  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setHeroMovie(movies[randomIndex]);
    }
  }, [movies]);

  window.onscroll = () => setIsScrolled(window.pageYOffset !== 0);

  return (
    <HeroContainer>
      <div className="hero">
        <TopNav isScrolled={isScrolled} />

        {heroMovie && (
          <img
            className="background-image"
            src={`https://image.tmdb.org/t/p/original${heroMovie.image}`}
            alt={heroMovie.name}
          />
        )}

        <div className="container">
          <div className="title">
            <h1>{heroMovie?.name}</h1>
            <p>
              {heroMovie?.overview ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
            </p>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/player")} className="playBtn">
              Play
            </button>
            <button className="moreBtn">More</button>
          </div>
        </div>
      </div>

      <SliderContainer movies={movies} />
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  .hero {
    position: relative;

    .background-image {
      width: 100%;
      height: 70vh;
      object-fit: cover;
      filter: brightness(40%);
    }

    .container {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      color: white;

      .title {
        h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        p {
          max-width: 600px;
          font-size: 1.2rem;
        }
      }

      .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;

        .playBtn,
        .moreBtn {
          border: none;
          border-radius: 0.3rem;
          font-weight: bold;
          font-size: 1.2rem;
          padding: 0.8rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .playBtn {
          background-color: red;
          color: white;
        }

        .moreBtn {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
        }

        .playBtn:hover {
          background-color: #e50914;
        }

        .moreBtn:hover {
          background-color: rgba(109, 109, 110, 0.4);
        }
      }
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .container {
        left: 1rem;
        .title {
          h1 {
            font-size: 3rem;
          }
          p {
            font-size: 1rem;
          }
        }
        .buttons {
          .playBtn,
          .moreBtn {
            font-size: 1rem;
            padding: 0.6rem 1.5rem;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .container {
        bottom: 1rem;
        .title {
          h1 {
            font-size: 2.5rem;
          }
          p {
            font-size: 0.9rem;
          }
        }
        .buttons {
          flex-direction: column;
          gap: 0.5rem;

          .playBtn,
          .moreBtn {
            width: 120px;
          }
        }
      }
    }

    @media (max-width: 480px) {
      .container {
        .title {
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 0.8rem;
          }
        }
        .buttons {
          .playBtn,
          .moreBtn {
            width: 100px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
`;

export default Netflix;
