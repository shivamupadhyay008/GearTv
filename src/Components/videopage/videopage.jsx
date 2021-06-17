import "./videopage.css";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import { openToast } from "../index";
import {
  addPlaylist,
  getVideo,
  setLikedVideo,
  removeLikedVideos,
  removePlaylist,
  setSavedVideo,
  removeSavedVideos,
} from "../../apis/api.utils";
export function VideoPage() {
  const navigate =useNavigate();
  const [playlistName, setPlaylistName] = useState(null);
  const [like, setLike] = useState(false);
  const [showList, setShowList] = useState(false);
  const [videoSave, setVideoSave] = useState(false);
  const { id } = useParams();
  const [video,setVideo]=useState(null);
  const { state, dispatch } = useUser();
  const {
    userData: { userId,isUserLoggedIn },
    playlists,
  } = state;
useEffect(()=>{
  dispatch({type:"OPEN_LOADER"});
  (async ()=>{
    const response= await getVideo(id);
    setVideo(response.data.video[0]);
    console.log(response.data.video[0]);
  })();
    dispatch({ type: "CLOSE_LOADER" });
},[])
  return video &&(
    <div className="video-page">
      <div>
        <iframe
          title="video-frame"
          className="videoframe"
          src={`https://www.youtube.com/embed/${video.video_id}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </div>
      <div className="features">
        <div className="center view-count">
          <VisibilityOutlinedIcon className="video-icon" />
          <span>{video.views} </span>
        </div>
        <div className="center like-count">
          <div
            onClick={async () => {
              if(isUserLoggedIn){
              dispatch({type:"OPEN_LOADER"})
              setLike(!like);
              const response = !like
                ? await setLikedVideo(
                    userId,
                    video.video_id,
                    video.channel_name,
                    video.likes,
                    video.title,
                    video.views
                  )
                : await removeLikedVideos(userId, video.user_id);
               console.log(response);
              if (response.status === 200) {
                dispatch({ type: "SET_LIKEDVIDEO" ,payload:response.data.likedvideos});
                openToast(
                  `${
                    !like ? `added to liked videos` : `removed from liked videos`
                  }`,
                  true
                );
              }else{
                openToast("something went wrong please try again",false);
              }
              dispatch({ type: "CLOSE_LOADER" });
            }else navigate("/login");
            }
          }
          >
            {like ? (
              <ThumbUpAltIcon className="video-icon" />
            ) : (
              <ThumbUpAltOutlinedIcon className="video-icon" />
            )}
          </div>
          <span>{video.likes} likes</span>
        </div>
        <div className="center save-ico">
          <div
            onClick={async () => {
              if(isUserLoggedIn){
              dispatch({type:"OPEN_LOADER"})
              setVideoSave(!videoSave);
              const response = !videoSave
                ? await setSavedVideo(
                    userId,
                    video.id,
                    video.channel_name,
                    video.likes,
                    video.title,
                    video.views
                  )
                : await removeSavedVideos(userId,video.video_id);
                console.log(response);
              if (response.status === 200) {
                dispatch({type:"SET_SAVEDVIDEO",payload:response.data.savedVideo})
                openToast(
                  `${
                    !videoSave? `added to liked videos` : `removed from liked videos`
                  }`,
                  true
                );
              }else{
                openToast("something went wrong please try again",false);
              }
              dispatch({ type: "CLOSE_LOADER" });
            }else navigate("/login");
            }
          }
          >
            {videoSave ? (
              <BookmarkOutlinedIcon className="video-icon" />
            ) : (
              <BookmarkBorderOutlinedIcon className="video-icon" />
            )}
          </div>
          <span>{videoSave ? "Saved" : "Save "}</span>
        </div>
        <div className="center playList-title">
          <PlaylistAddIcon
            onClick={() => {
              if(isUserLoggedIn)setShowList(true)
              else navigate("/login")
            }}
            className="video-icon"
          />
          <span>Add to Playlist </span>
          <div className={showList ? "playlistdiv" : "playlistdiv enable"}>
            <ul>
              {playlists.map((item) => {
                return (
                  <li key={item._id}>
                    <input
                      className="playlist-checkbox "
                      type="checkbox"
                      onClick={async (event) => {
                        console.log("values", event.target.checked);
                        dispatch({ type: "OPEN_LOADER" });
                        const response = event.target.checked
                          ? await addPlaylist(
                              userId,
                              item.name,
                              video.video_id,
                              video.channel_name,
                              video.likes,
                              video.title,
                              video.views
                            )
                          : await removePlaylist(userId, item.name, video.video_id);
                        console.log(response);
                        if (response.status === 200) {
                          dispatch({
                            type: "SET_PLAYLIST",
                            payload: response.data.playlists,
                          });
                          openToast(
                            `${
                              event.target.checked
                                ? `added video to`
                                : `video removed from`
                            } ${item.name}`,
                            true
                          );
                        } else {
                          openToast("unable to add at this moment ", false);
                        }
                        dispatch({ type: "CLOSE_LOADER" });
                      }
                    }
                    />
                    <span className="listname">{item.name}</span>
                  </li>
                );
              })}
            </ul>
            <div>
              <input
                className="playlist-input"
                type="text"
                onChange={(event) => setPlaylistName(event.target.value)}
              />
              <div
                className="add-btn"
                onClick={async () => {
                  const response = await addPlaylist(userId, playlistName);
                  dispatch({
                    type: "SET_PLAYLIST",
                    payload: response.data.playlists,
                  });
                }}
              >
                <AddIcon />
              </div>
            </div>
            <button className="btn-center" onClick={() => setShowList(false)}>
              cancel
            </button>
          </div>
        </div>
      </div>
      <div className="video-title">{video.title}</div>
      <div className="video-description">
        {video.description.split("\n").map(function (item, idx) {
          return (
            <span key={idx}>
              {item}
              <br />
            </span>
          );
        })}
      </div>
    </div>
  );
}
