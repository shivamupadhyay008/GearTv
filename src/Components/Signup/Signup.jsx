import './Signup.css';
import {useState} from "react";
import { Link,  useNavigate } from "react-router-dom";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { openToast } from '../Toast/Toast';
import {userSignup} from "../../apis/api.utils";
import {useUser} from "../../context/usercontext";
export function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameErrorValidation, setNameErrorValidation] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordErrorValidation, setPasswordErrorValidation] = useState(false);
  const navigate = useNavigate();
  const {dispatch}=useUser();
  const validateInput = (email, password, name) => {
    const regExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (password?.length <= 0) setPasswordErrorValidation(true);
    else setPasswordErrorValidation(false);
    if (name?.length <= 0) setNameErrorValidation(true);
    else setNameErrorValidation(false);
    if (regExp.test(email) && password?.length !== 0 && name?.length !== 0)
      return true;
    else return false;
  };
  const signUp = async (name, email, password) => {
    try{
      dispatch({type:"OPEN_LOADER"});
      const response = await userSignup(name,email,password);
      console.log(response)
      if(response.status===200){
      openToast("Sign up is success", true);
      setEmail('');
      setPassword('');
      setName('');
      }else{
        openToast("Something went wrong please try again", false);
      }
    }catch(err){
      console.log(err.message);
      openToast("Something went wrong please try again",false)
    }
    dispatch({ type: "CLOSE_LOADER" });
  };
  return (
    <div className="login-div">
      <div className="box">
        <div className="login-nav">
          <div></div>
          <ClearOutlinedIcon
            onClick={() => {
              navigate("/");
            }}
            className="login-nav-btn"
            fontSize="large"
          />
        </div>
        <h3 className="login-hero">Sign up</h3>
        <section className="wd show-div">
          <div>
            <label className="div-label" for="email">
              Name
            </label>
            <div className=" sign-input">
              <input
                onChange={(event) => setName(event.target.value)}
                className=" inputs "
                type="text"
                id="name"
                value={name}
                placeholder="Enter your name"
              />
              <div
                className={`email-error-div ${
                  !nameErrorValidation ? `hide-div` : `flex`
                }`}
              >
                <span> Invalid name</span>
                <span>
                  <ErrorOutlineOutlinedIcon fontSize="small" />
                </span>
              </div>
            </div>
            <label className="div-label" for="email">
              Email
            </label>
            <div className=" sign-input">
              <input
                onChange={(event) => setEmail(event.target.value)}
                className="inputs"
                type="text"
                id="email1"
                value={email}
                placeholder="Enter your email"
              />
              <div
                className={`email-error-div ${
                  !emailError ? `hide-div` : `flex`
                }`}
              >
                <span> Invalid email</span>
                <span>
                  <ErrorOutlineOutlinedIcon fontSize="small" />
                </span>
              </div>
            </div>
            <label className="div-label" for="email">
              Password
            </label>
            <div className=" sign-input">
              <input
                onChange={(event) => setPassword(event.target.value)}
                className="inputs password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
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
              <div
                className={`email-error-div ${
                  !passwordErrorValidation ? `hide-div` : `flex`
                }`}
              >
                <span>Password required</span>
                <span>
                  <ErrorOutlineOutlinedIcon fontSize="small" />
                </span>
              </div>
            </div>
          </div>
          <div className="btn">
            <span></span>
            <button
              className=""
              disabled={
                (email.length !== 0) | (name.length !== 0) ? "" : "true"
              }
              className = {` btn-login ${(email.length !== 0) | (name.length !== 0) ? "" : "btn-disable"}`}
              onClick={() => {
                const validate = validateInput(email, password, name);
                console.log(validate);
                if (validate) {
                  signUp(name, email, password);
                }
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </button>
          </div>
          <div className="signup-span">
            back to ?
            <Link to="/login">
              <span className="singup-text">Login</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
