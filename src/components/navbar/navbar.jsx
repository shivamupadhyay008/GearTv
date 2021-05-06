import { useState } from "react";
import "./navbar.css";
import {Link} from "react-router-dom";
export default function Navbar() {
  const [slider, setSlider] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <div className="nav-div">
      <nav className="nav-bar">
        <div>
          <div className="hamberger" onClick={() => setSlider(true)}>
            <span className=""></span>
            <span className=""></span>
            <span className=""></span>
          </div>
          <a href="/">
            <img className="gear-pic" src="imgs/geartvCH.png" />
          </a>
        </div>
        <div
          onClick={() => setSlider(false)}
          className={slider ? "slider slideropt " : "slider"}
        >
          <div className="nav-list nostyle">
            <div className="bottom-bor">
              <div className="padding-px">
                <span className="hero-text">Log in</span>
                <p className="msg2 nomar">For better experience </p>
              </div>
            </div>

            <div className="slider-items bottom-bor padding-px">
              <div>
                <span><a href="/">HOME</a></span>
              </div>
              <div>
                <span><a href="/uservideos">Watch List</a></span>
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
        <div className="your-class"><Link  to="uservideos"> your videos</Link></div>
        <div
          className={activeSearch ? "nav-search display-active" : "nav-search "}
        >
          <i
            onClick={() => setActiveSearch(false)}
            class="search-back-icon fas fa-arrow-left"
          ></i>

          <span>
            <input className="search-input" type="text" placeholder="Search" />
            <i class="fa fa-search search-icon"></i>
          </span>
          <i class="fa fa-search res-search-icon"></i>
          <span className="nav-icon">Login</span>
        </div>
        <i
          onClick={() => setActiveSearch(true)}
          class="fa fa-search search-button"
        ></i>
      </nav>
    </div>
  );
}
