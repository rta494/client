import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TopNav from "../components/TopNav";
import SliderContainer from "../components/SliderContainer";
import { fetchMovies, getGenres } from "../store";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  // Fetch genres and movies
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded, dispatch]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pick the first movie for hero (simpler than random)
  const heroMovie = movies.length > 0 ? movies[0] : null;

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

        <div className="hero-content">
          <h1>{heroMovie?.name}</h1>
          <p>Welcome to Netflix! Enjoy the latest movies and shows.</p>
          <div className="buttons">
            <button className="play" onClick={() => navigate("/player")}>
              Play
            </button>
            <button className="more">More</button>
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

    .hero-content {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      color: white;

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
        max-width: 500px;
      }

      .buttons {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;

        button {
          border: none;
          border-radius: 0.3rem;
          font-weight: bold;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .play {
          background-color: red;
          color: white;
        }

        .more {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
        }

        button:hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .hero-content {
      left: 1rem;
      bottom: 1rem;

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 0.85rem;
      }

      .buttons {
        flex-direction: column;
        gap: 0.5rem;
        button {
          width: 120px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero-content {
      h1 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.75rem;
      }

      .buttons {
        button {
          width: 100px;
          font-size: 0.85rem;
        }
      }
    }
  }
`;

export default Netflix;
