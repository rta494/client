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
            <h1>Login</h1>
            <div className="inputs">
              <input
                type="email"
                placeholder="Email"
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
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100vh;

  .loginContent {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form-wrapper {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.85);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: white;

      h1 {
        text-align: center;
        font-size: 2rem;
      }
      .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      input {
        padding: 0.8rem 1rem;
        font-size: 1rem;
        border-radius: 4px;
        border: none;
        outline: none;
      }
      button {
        margin-top: 1rem;
        padding: 0.8rem;
        font-size: 1rem;
        background-color: red;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 480px) {
    .loginContent .form-wrapper {
      width: 90%;
      padding: 1rem;
    }
  }
`;

export default LoginPage;
