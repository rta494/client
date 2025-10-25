import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
      <div className="content">
        <Header login />
        <div className="form">
          <h1>Unlimited movies, TV shows, and more</h1>
          {!showPassword ? (
            <>
              <input
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            </>
          ) : (
            <>
              <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />
              <button onClick={handleSignUp}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100vh;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form {
      width: 100%;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: rgba(0, 0, 0, 0.85);
      padding: 2rem;
      border-radius: 8px;
      color: white;
      text-align: center;

      h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      input {
        padding: 0.8rem 1rem;
        font-size: 1rem;
        border-radius: 4px;
        border: none;
        outline: none;
      }
      button {
        padding: 0.8rem;
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
    .content .form {
      width: 90%;
      padding: 1rem;
    }
  }
`;

export default SignUpPage;
