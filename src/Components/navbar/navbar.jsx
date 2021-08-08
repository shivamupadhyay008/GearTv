import "./navbar.css";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useUser } from "../../context/usercontext";
import { AiOutlineUser } from "react-icons/ai";
import {openToast} from "../index";
export function Navbar() {
  const [slider, setSlider] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const {state:{userData:{isUserLoggedIn,name}}, dispatch } = useUser();
  const navigate =useNavigate();
  return (
    <div className="nav-div">
      <nav className="nav-bar">
        <div>
          <div className="hamberger" onClick={() => setSlider(true)}>
            <span className=""></span>
            <span className=""></span>
            <span className=""></span>
          </div>
          <Link to="/">
            <img className="gear-pic" src="imgs/geartvCH.png" alt="broke" />
          </Link>
        </div>
        <div
          onClick={() => setSlider(false)}
          className={slider ? "slider slideropt " : "slider"}
        >
          <div className="nav-list nostyle">
            <div className="bottom-bor">
              <div className="padding-px" onClick={()=>{
                if(!isUserLoggedIn)navigate("/login")
              }}>
                <span className="hero-text" onClick={()=>navigate("/profile")}>
                  {isUserLoggedIn ? <AiOutlineUser /> : `Log in`}
                </span>
                <p className="msg2 nomar">
                  {!isUserLoggedIn ? `For better experience` : `Hii ${name}`}{" "}
                </p>
              </div>
            </div>

            <div className="slider-items bottom-bor padding-px">
              <div className="btn-clk">
                <span>
                  <Link to="/">Home</Link>
                </span>
              </div>
              {isUserLoggedIn ? (
                <div className="btn-clk">
                  <span>
                    <Link to="/uservideos">Your Videos</Link>
                  </span>
                </div>
              ) : (
                ""
              )}
              {isUserLoggedIn ? (
                <div
                  className="btn-clk"
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    openToast("log out success", true);
                    navigate("/");
                    localStorage.removeItem("GEARTV_USER_TOKEN");
                  }}
                >
                  <span>Logout</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="slider-items bottom-bor padding-px">
              <div>
                <span>Mobile</span>
              </div>
              <div>
                <span>Laptop</span>
              </div>
              <div>
                <span>Camera</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={activeSearch ? "nav-search display-active" : "nav-search "}
        >
          <i
            onClick={() => setActiveSearch(false)}
            class="search-back-icon fas fa-arrow-left"
          ></i>

          <span>
            <input
              onChange={(event) => {
                dispatch({ type: "SEARCH", payload: event.target.value });
              }}
              className="search-input"
              type="text"
              placeholder="Search"
            />
            <i class="fa fa-search search-icon"></i>
          </span>
          <i class="fa fa-search res-search-icon"></i>
          <Link to={isUserLoggedIn ? "/profile" : "/login"}>
            <span className="nav-icon">
              {isUserLoggedIn ? (
                <AiOutlineUser className="usr-ico" />
              ) : (
                `Log in`
              )}
            </span>
          </Link>
        </div>
        <i
          onClick={() => setActiveSearch(true)}
          class="fa fa-search search-button"
        ></i>
      </nav>
    </div>
  );
}
