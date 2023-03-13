import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, Googleprovider, facebookProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");

  const navigate = useNavigate();

  const signUpWithFacebook = async (e) => {
    try {
      e.preventDefault();

      const userCredentials = signInWithPopup(auth, facebookProvider);
    } catch (error) {
      const errorCode = error.code;
      return;
    }
  };

  const signupWithEmail = async (e) => {
    try {
      e.preventDefault();

      if (!email || !password || !confirm) {
        console.log("Fill all the fields");
        return;
      }

      if (password !== confirm) {
        console.log("Password doesnot match");
        return;
      }

      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCreds.user);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (e) => {
    try {
      e.preventDefault();

      if (!email || !password) {
        console.log("Fill all the fields");
        return;
      }

      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCreds.user);

      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, Googleprovider);
      console.log(userCredentials);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        width: "50%",
        border: "1px solid",
        marginTop: "15rem",
        padding: "2rem",
      }}
    >
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item" onClick={() => setToggle(true)}>
            <a className="nav-link active" href="#">
              SignUp
            </a>
          </li>
          <li className="nav-item" onClick={() => setToggle(false)}>
            <a className="nav-link" href="#">
              SignIn
            </a>
          </li>
        </ul>
      </div>

      <div className="container" style={{ width: "80%" }}>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>

          {toggle && (
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setconfirm(e.target.value)}
                value={confirm}
              />
            </div>
          )}

          {toggle ? (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              onClick={(e) => signupWithEmail(e)}
            >
              SignUp
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              onClick={(e) => signInWithEmail(e)}
            >
              SignIn
            </button>
          )}
        </form>
        <h4 className="text-center">Or</h4>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={signUpWithGoogle}
        >
          Signup/SignIn with Google
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg btn-block"
          onClick={(e) => signUpWithFacebook(e)}
        >
          Signup/SignIn with facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
