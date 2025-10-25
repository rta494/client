import React from "react";
import styled from "styled-components";
import MovieSlider from "./MovieSlider";

const SliderContainer = ({ movies }) => {
  const getMoviesBetween = (start, end) => movies.slice(start, end);

  return (
    <Wrapper>
      <MovieSlider data={getMoviesBetween(0, 10)} title="Only on Netflix" />
      <MovieSlider data={getMoviesBetween(10, 20)} title="Trending Now" />
      <MovieSlider data={getMoviesBetween(20, 30)} title="Popular on Netflix" />
      <MovieSlider data={getMoviesBetween(30, 40)} title="New Releases" />
      <MovieSlider data={getMoviesBetween(40, 50)} title="Family Movies" />
      <MovieSlider data={getMoviesBetween(50, 60)} title="Kids Movies" />
      <MovieSlider data={getMoviesBetween(60, 70)} title="Romantic Movies" />
      <MovieSlider data={getMoviesBetween(70, 80)} title="Action Movies" />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SliderContainer;
