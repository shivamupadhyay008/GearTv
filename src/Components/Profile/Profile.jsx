import "./Profile.css";
import{Link ,useNavigate} from "react-router-dom";
import {openToast} from "../index"
import {useUser} from "../../context/usercontext"
export function Profile() {
  const {dispatch,state} =useUser();
  const navigate=useNavigate();
  return (
    <section className="user-section">
      <div className="user-div">
        <div class="avatar">
          <div class="g-avatar g-avatar-txt-lg">
            {state.userData.name.slice(0, 1)}
          </div>
        </div>
        <p>{state.userData.name}</p>
        <div className="content-div">
          <span>Email </span>
          <p className="user-heading">
            <span>{state.userData.email}</span>
          </p>
          <Link to="/uservideos">
            {" "}
            <p className="user-heading">your videos</p>
          </Link>
          <p
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              openToast("log out success", true);
              navigate("/");
              localStorage.removeItem("GEARTV_USER_TOKEN");
            }}
            className="user-heading cursor"
          >
            Log out
          </p>
        </div>
      </div>
    </section>
  );
}
