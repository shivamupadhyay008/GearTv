import "./vcard.css";
import { Link } from "react-router-dom";
export function Vcard({ src, title, view, likes, channelName }) {
  return (
    <div className="card-div">
      <Link to={`/watch/${src}`}>
        <div className="video-card">
          <img
            className="card-image"
            src={`https://img.youtube.com/vi/${src}/0.jpg`}
            alt=""
            srcset=""
          />
          <div className="card-image-div"></div>
        </div>
        <div className="text-div">
          <p className=" card-title">{title}</p>
          <p className="nomargin card-description">{channelName}</p>
          <p className="nomargin card-duration">
            <span>{view} views</span>
            <span> • {likes} likes</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export function Listingcard({ src, title, view, likes, channelName }) {
  return (
    <div className="l-card-div">
      <div className="l-video-card">
        <img
          className="card-image"
          src={`https://img.youtube.com/vi/${src}/0.jpg`}
          alt=""
          srcset=""
        />
        <Link to={`/watch/${src}`}>
          <div className="card-image-div"></div>
        </Link>
      </div>

      <div className="text-div">
        <p className=" card-title">{title}</p>
        <p className="nomargin card-description">{channelName}</p>
        <p className="nomargin card-duration">
          <span>{view} views</span>
          <span> • {likes} likes</span>
        </p>
      </div>
    </div>
  );
}
