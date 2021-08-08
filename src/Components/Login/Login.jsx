import "./login.css";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../apis/api.utils";
import { useUser } from "../../context/usercontext";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { openToast } from "../Toast/Toast";
export function Login() {
  const { dispatch } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passValidation, setPassValidation] = useState(false);
  const [validation, setValidation] = useState(false);
  const [next, setNext] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let emailValidation = false;
  let passwordValidation = false;
  const validateEmail = (email) => {
    const regExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(email)) {
      setNext("userok");
      setValidation(false);
      emailValidation = false;
    } else {
      setValidation(true);
      emailValidation = true;
    }
  };
  const validatePassword = (password) => {
    if (password.length <= 0) {
      setPassValidation(true);
      passwordValidation = true;
    } else {
      passwordValidation = false;
      setPassValidation(false);
    }
  };

  async function login(obj) {
    if(obj?.guest){
      dispatch({ type: "OPEN_LOADER" });
      const response = await userLogin("shivam@gmail.com", "user123");
      if (response.status === 200) {
        localStorage.setItem("GEARTV_USER_TOKEN", response.data.token);
        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              name: response.data.user.name,
              email: response.data.user.email,
              id: response.data.user._id,
            },
            playlists: response.data.user.playlists,
            likedVideos: response.data.user.liked_video,
            savedVideos: response.data.user.saved_video,
          },
        });
        navigate(state?.from ? state.from : "/");
    }
  }else{
    validateEmail(email);
    if (next === "userok") {
      validatePassword(password);
    }
    if (next === "userok" && !passwordValidation) {
      dispatch({ type: "OPEN_LOADER" });
      const response = await userLogin(email, password);
      if (response.status === 200) {
        localStorage.setItem("GEARTV_USER_TOKEN", response.data.token);
        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              name: response.data.user.name,
              email: response.data.user.email,
              id: response.data.user._id,
            },
            playlists: response.data.user.playlists,
            likedVideos: response.data.user.liked_video,
            savedVideos: response.data.user.saved_video,
          },
        });
        navigate(state?.from ? state.from : "/");
      } else {
        openToast("User or password incorrect", false);
      }
      dispatch({ type: "CLOSE_LOADER" });
    }
  }
  }
  return (
    <div className="login-div">
      <div className="box">
        <div className="login-nav">
          {next === "userok" ? (
            <CallMadeOutlinedIcon
              onClick={() => {
                setNext("");
              }}
              className="back-btn login-nav-btn"
              fontSize="large"
            />
          ) : (
            <div></div>
          )}
          <ClearOutlinedIcon
            onClick={() => {
              navigate("/");
            }}
            className="login-nav-btn"
            fontSize="large"
          />
        </div>
        <h3 className="login-hero">Login </h3>
        <section className="login-sec ">
          <div
            className={` input-div email-div ${
              next === "userok" ? "hide-div" : ""
            }`}
          >
            <label className="div-label" htmlFor="email">
              Email
            </label>
            <div className="input-divs">
              <input
                onChange={(event) => setEmail(event.target.value)}
                className=" inputs"
                type="text"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div
              className={`email-error-div ${!validation ? `hide-div` : `flex`}`}
            >
              <span> Invalid Email</span>
              <span>
                <ErrorOutlineOutlinedIcon fontSize="small" />
              </span>
            </div>
          </div>
          <div
            className={`input-div  password-div ${
              next === "" ? "hide-div" : "show-div"
            }`}
          >
            <label className="div-label" htmlFor="password">
              Password
            </label>
            <div className="input-divs">
              <input
                onChange={(event) => setPassword(event.target.value)}
                className="inputs password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />
              <span className="view-password-btn">
                {showPassword ? (
                  <VisibilityOutlinedIcon
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer", color: "var(--BRAND_BLUE)" }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </span>
            </div>
            <div
              className={`email-error-div ${
                !passValidation ? `hide-div` : `flex`
              }`}
            >
              <span> Password required</span>
              <span>
                <ErrorOutlineOutlinedIcon fontSize="small" />
              </span>
            </div>
          </div>
          <div className="btn">
            <span></span>
            <button
              className="btn-login"
              disabled={email.length !== 0 ? "" : true}
              className={`btn-login ${email.length !== 0 ? "" : "btn-disable"}`}
              onClick={() => {
                login();
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </button>
          </div>
        </section>
        <section>
          <span className="signup-span">
            new here?
            <Link to="/signup">
              <span className="singup-text">Sign up</span>
            </Link>
          </span>
        </section>
        <span
          className="guest-lg"
          onClick={() => {
            login({guest:true});
          }}
        >
          Login as guest
        </span>
      </div>
    </div>
  );
}
