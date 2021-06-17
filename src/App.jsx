import "./styles.css";
import {
  UserVideoListing,
  Navbar,
  VideoPage,
  Videos,
  Login,
  Profile,
  Loader,
  Signup,
} from "./Components/index";
import { userLogin } from "./apis/api.utils";
import { useUser } from "./context/usercontext";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  const { dispatch } = useUser();
  useEffect(() => {
    dispatch({type:"OPEN_LOADER"});
    (async () => {
      try {
        const userToken = localStorage.getItem("GEARTV_USER_TOKEN");
        const response = await userLogin(null,null,userToken);
        console.log("in login", response);
        if (response.status === 200) {
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
        }
      } catch (err) {
        console.log(err.message);
      }
     dispatch({ type: "CLOSE_LOADER" });
    })
    ();
  }, []);
  return (
    <div>
      <Navbar />
      <Loader />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watch/:id" element={<VideoPage />} />
        <Route path="/uservideos" element={<UserVideoListing />} />
      </Routes>
    </div>
  );
}
