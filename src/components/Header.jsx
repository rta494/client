import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = ({ login }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className="logo" onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
          alt="Netflix Logo"
        />
      </div>
      <button onClick={() => navigate(login ? "/login" : "/signup")}>
        {login ? "Login" : "Sign Up"}
      </button>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  .logo img {
    height: 2.8rem;
    cursor: pointer;
  }

  button {
    padding: 0.5rem 1.25rem;
    background-color: #e50914;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    .logo img {
      height: 2.2rem;
    }
    button {
      padding: 0.4rem 1rem;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    .logo img {
      height: 2rem;
    }
    button {
      padding: 0.35rem 0.9rem;
      font-size: 0.9rem;
    }
  }
`;
