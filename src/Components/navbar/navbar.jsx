import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import { AiOutlineUser } from "react-icons/ai";
export function Navbar() {

  const [slider, setSlider] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const {state:{userData:{isUserLoggedIn,name}}, dispatch } = useUser();
  console.log(isUserLoggedIn)
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
              <div className="padding-px">
                <span className="hero-text">
                  {isUserLoggedIn ? <AiOutlineUser />  : `Log in`}
                </span>
                <p className="msg2 nomar">{!isUserLoggedIn? `For better experience`:`Hii ${name}`} </p>
              </div>
            </div>

            <div className="slider-items bottom-bor padding-px">
              <div>
                <span>
                  <Link to="/">Home</Link>
                </span>
              </div>
              <div>
                <span>
                  <Link to="/uservideos">Your Videos</Link>
                </span>
              </div>
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
          <Link to={isUserLoggedIn?"/profile":"/login"}>
            <span className="nav-icon">
              {isUserLoggedIn ? <AiOutlineUser className="usr-ico"/> : `Log in`}
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
