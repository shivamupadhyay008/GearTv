import "./video.css";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../data";
import { useUser } from "../../context/usercontext";
export default function VideoPage() {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [showList, setShowList] = useState(false);
  const [videoSave, setVideoSave] = useState(false);
  const list = ["one", "two", "three"];
  const { id } = useParams();
  const dummy = data.find((item) => item.id == id);
  const { state, dispatch } = useUser();
  const { likedVideos } = state;
  console.log("context", likedVideos);
  return (
    <div className="video-page">
      <div>
        <iframe
          className="videoframe"
          src={`https://www.youtube.com/embed/${dummy.id}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </div>
      <div className="features">
        <div className="center view-count">
          <VisibilityOutlinedIcon className="video-icon" />
          <span>{dummy.views} </span>
        </div>
        <div className="center like-count">
          <div
            onClick={() => {
              setLike(!like);
              dispatch({ type: "LIKE", payload: dummy });
            }}
          >
            {like ? (
              <ThumbUpAltIcon className="video-icon" />
            ) : (
              <ThumbUpAltOutlinedIcon className="video-icon" />
            )}
          </div>
          <span>{dummy.likes} likes</span>
        </div>
        <div className="center save-ico">
          <div
            onClick={() => {
              setVideoSave(!videoSave);
              dispatch({ type: "SAVE", payload: dummy });
            }}
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
            onClick={() => setShowList(true)}
            className="video-icon"
          />
          <span>Add to Playlist </span>
          <div className={showList ? "playlistdiv" : "playlistdiv enable"}>
            <ul>
              {/* {list.map((item) => {
                return (
                  <li>
                    <input
                      className="playlist-checkbox "
                      type="checkbox"
                      name=""
                      id=""
                    />
                    <span className="listname">{item}</span>
                  </li>
                );
              })} */}
              <li>
                    <input
                      className="playlist-checkbox "
                      type="checkbox"
                     onClick={ dispatch({ type: "PLAYLIST", payload: dummy })}
                    />
                    <span className="listname">playlist</span>
                  </li>
            </ul>
            <div>
              <input className="playlist-input" type="text" />
              <AddIcon className="add-btn" />
            </div>
            <button className="btn-center" onClick={() => setShowList(false)}>
              cancel
            </button>
          </div>
        </div>
      </div>
      <div className="video-title">{dummy.title}</div>
      <div className="video-description">{dummy.desc}</div>
    </div>
  );
}
