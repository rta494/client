import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <Wrapper>
      <BackgroundImage />
      <div className="loginContent">
        <Header />
        <div className="form-wrapper">
          <div className="form">
            <h1>Sign In</h1>
            <div className="inputs">
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin}>Sign In</button>

            <div className="help-text">
              <span>
                New to Netflix? <a href="/signup">Sign up now.</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .loginContent {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1; /* ensures above background */
    background-color: rgba(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    /* Keep header at top, form centered below */
    justify-content: flex-start;
    align-items: center;
    padding-top: 6rem; /* space for header */

    .form-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    .form {
      background-color: rgba(0, 0, 0, 0.85);
      padding: 3rem 2.5rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: white;

      h1 {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
      }

      .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      input {
        padding: 1rem;
        font-size: 1rem;
        border-radius: 4px;
        border: none;
        outline: none;
        background-color: #333;
        color: white;
      }

      input::placeholder {
        color: #aaa;
      }

      button {
        margin-top: 1rem;
        padding: 1rem;
        font-size: 1rem;
        background-color: #e50914;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s ease;
      }

      button:hover {
        background-color: #f40612;
        transform: scale(1.03);
      }

      .help-text {
        text-align: center;
        color: #b3b3b3;
        font-size: 0.9rem;

        a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          margin-left: 4px;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loginContent {
      padding-top: 4rem;
    }
    .form {
      padding: 2rem 1.5rem;
    }
    .form h1 {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .loginContent .form {
      max-width: 90%;
      padding: 1.5rem;
    }
    .form input,
    .form button {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
`;
