import React, { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const TopNav = ({ isScrolled }) => {
  const navlinks = [
    { name: "Home", link: "/" },
    { name: "Tv Show", link: "/tv" },
    { name: "My List", link: "/mylist" },
    { name: "Movies", link: "/movies" },
  ];

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <NavContainer>
      <nav className={`${isScrolled ? "scrolled" : "notScroll"}`}>
        <div className="leftSide">
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
              alt="Netflix Logo"
            />
          </div>
          <ul className={`links ${menuOpen ? "open" : ""}`}>
            {navlinks.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rightSide">
          <button onClick={() => signOut(firebaseAuth)}>
            <AiOutlineLogout />
          </button>
          <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>
            <AiOutlineMenu />
          </button>
        </div>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  nav {
    position: fixed;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    z-index: 2;
    padding: 0 1rem;
    align-items: center;
    display: flex;
    transition: 0.3s ease-in-out;
    &.scrolled {
      background-color: black;
    }

    .leftSide {
      display: flex;
      align-items: center;
      gap: 2rem;

      .logo img {
        width: 8rem;
        height: auto;
        cursor: pointer;
      }

      .links {
        display: flex;
        list-style: none;
        gap: 2rem;

        a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
        }
      }

      /* Mobile menu */
      @media (max-width: 768px) {
        .links {
          position: fixed;
          top: 6rem;
          left: 0;
          background-color: #141414;
          flex-direction: column;
          width: 100%;
          gap: 1.5rem;
          padding: 1rem 0;
          display: none;

          &.open {
            display: flex;
          }
        }
      }
    }

    .rightSide {
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 0.3rem;
        svg {
          color: white;
          font-size: 1.8rem;
        }
      }

      .menuBtn {
        display: none;
        background-color: transparent;
        svg {
          color: white;
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          display: block;
        }
      }
    }
  }
`;

export default TopNav;
