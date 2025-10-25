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
      {/* ✅ Pass background image URL */}
      <BackgroundImage src="https://assets.nflxext.com/ffe/siteui/vlv3/4f98e4a2-34a1-4f8b-9b18-55a1f381cc06/baaf6f49-60a5-48a5-97b5-63b9b1956b4e/US-en-20240930-popsignuptwoweeks-perspective_alpha_website_small.jpg" />

      <div className="overlay">
        <Header />
        <div className="form-container">
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
                New to Netflix?{" "}
                <a href="/signup" className="link">
                  Sign up now.
                </a>
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

  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  .form-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);

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

      .link {
        color: white;
        text-decoration: none;
        font-weight: bold;
        margin-left: 4px;
      }

      .link:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    .form {
      padding: 2rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .form {
      max-width: 90%;
      padding: 1.5rem;
    }
  }
`;
