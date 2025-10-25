import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
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
          <div className="logo">
            <img
              src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png"
              alt="Netflix Logo"
            />
          </div>
          <ul className="links">
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
    padding: 0.4rem;
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
      margin-left: 5rem;
      .logo img {
        width: 10rem;
        height: 2rem;
      }
      .links {
        display: flex;
        list-style: none;
        gap: 3rem;
      }
      .links a {
        color: white;
        text-decoration: none;
      }
    }
    .rightSide {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: 1rem;
      button {
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 0.2rem;
        svg {
          color: white;
          font-size: 2rem;
        }
      }
    }
  }
`;

export default TopNav;
