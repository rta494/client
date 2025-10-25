import React from "react";
import styled from "styled-components";

const BackgroundImage = ({ src, altText = "Netflix background" }) => {
  return (
    <BackgroundContainer>
      <img src={src} alt={altText} loading="lazy" />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
`;

export default BackgroundImage;
