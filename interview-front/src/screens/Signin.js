import React, { useEffect, useState } from "react";
import "./style.css";
import regis from "./img/register.svg";
import log from "./img/log.svg";
import { useForm } from "react-hook-form";
import { InputGroupAddon, InputGroupText } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ShowPassword = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-eye"
    viewBox="0 0 16 16"
  >
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>
);

const HidePassword = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-eye-slash"
    viewBox="0 0 16 16"
  >
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
  </svg>
);
//Movie Component
const Signin = () => {
  const { register, handleSubmit, errors } = useForm();
  const [type, setType] = useState("password");
  const [typeRequest, setTypeRequest] = useState("signin");
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");

    sign_up_btn &&
      sign_up_btn.addEventListener("click", () => {
        const container = document.querySelector(".containersigin");
        container?.classList?.add("sign-up-mode");
        setTypeRequest("signup");
      });

    sign_in_btn &&
      sign_in_btn.addEventListener("click", () => {
        const container = document.querySelector(".containersigin");
        setTypeRequest("signin");
        container?.classList?.remove("sign-up-mode");
      });
  }, []);
  const onSubmit = async (data) => {
    try{
    const Client = axios.create({ baseURL: process.env.REACT_APP_BACKEND_SERVER_URL + "/api" });

    let res = await Client.post(`${typeRequest}`, data);
    console.log(res.data.message)
    if (res.data.token) {
      localStorage.setItem("tokenpeerjsapp", res.data.token);
      window.location.href = "/";
      toast.success(" 🎉 Sigin success ", {
        style: {
          fontFamily: "Poppins",
        },
      });
    }                
  } catch (err) {
    console.log('err',err)
    toast.error(` 😢 Error occured . ${err.response.data.error}`, {
      style: {
        fontFamily: "Poppins",
      },
    });
  }
  };
  const switchPsswType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <div
      className=""
    >    <div class="containersigin">
      <div class="forms-container">
        <div class="signin-signup">
          {typeRequest === "signin" && (
            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={register({ required: true })}
                />
                {errors.email && <h3 style={{ color: "#cb6363" }}>Required</h3>}
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type={type}
                  placeholder="Password"
                  autoComplete="new-password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && (
                  <h3 style={{ color: "#cb6363" }}>Required</h3>
                )}
                <InputGroupAddon
                  onClick={switchPsswType}
                  addonType="prepend"
                  style={{ cursor: "pointer" }}
                >
                  <InputGroupText>
                    {type === "password" ? <ShowPassword /> : <HidePassword />}
                  </InputGroupText>
                </InputGroupAddon>
              </div>
              <button
                disabled={false}
                className="btn btn-primary btn-block waves-effect waves-light"
                type="submit"
              >
                {true && (
                  <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2" />
                )}{" "}
                Login
              </button>
              {/* <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <a href="/" className="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
          )}
          {typeRequest === "signup" && (
            <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  ref={register({ required: true })}
                />
                {errors.name && <h3 style={{ color: "#cb6363" }}>Required</h3>}
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={register({ required: true })}
                />
                {errors.email && <h3 style={{ color: "#cb6363" }}>Required</h3>}
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type={type}
                  placeholder="Password"
                  autoComplete="new-password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && (
                  <h3 style={{ color: "#cb6363" }}>Required</h3>
                )}
                <InputGroupAddon
                  onClick={switchPsswType}
                  addonType="prepend"
                  style={{ cursor: "pointer" }}
                >
                  <InputGroupText>
                    {type === "password" ? <ShowPassword /> : <HidePassword />}
                  </InputGroupText>
                </InputGroupAddon>
              </div>
              <button
                disabled={false}
                className="btn btn-primary btn-block waves-effect waves-light"
                type="submit"
              >
                {true && (
                  <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2" />
                )}{" "}
                Sign up
              </button>
              {/* <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <a href="/" className="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="/" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
          )}
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>----------------------------------------------------------</p>
            <button class="btn transparent" id="sign-up-btn">
              <h3>Sign up</h3>
            </button>
            <p>----------------------------------------------------------</p>
          </div>
          <img src={log} class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>----------------------------------------------------------</p>
            <button class="btn transparent" id="sign-in-btn">
              <h3>Sign in</h3>
            </button>
            <p>----------------------------------------------------------</p>
          </div>
          <img src={regis} class="image" alt="" />
        </div>
      </div>

    </div>
      <ToastContainer autoClose={3000} position={"bottom-right"} />
    </div>
  );
};

export default Signin;
