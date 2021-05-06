import { useState } from "react";
import "./vcard.css";
import {Link } from "react-router-dom"
export default function Vcard({ src, title, view, likes, channelName }) {
  return (
    <div className="card-div">
      <div className="video-card">
        <iframe
          className="card-image"
          src={`https://www.youtube.com/embed/${src}`}
          frameborder="0"
        ></iframe>
        <Link to={`/watch/${src}`}>
        <div className="card-image-div"></div>
        </Link>
      </div>

      <div className="text-div">
        <p className=" card-title">{title}</p>
        <p className="nomargin card-description">{channelName}</p>
        <p className="nomargin card-duration">
          <span>{view} views</span>
          <span> • {likes} ago</span>
        </p>
      </div>
    </div>
  );
}

export function Listingcard({ src, title, view, likes, channelName }) {
  return (
    <div className="l-card-div">
      <div className="l-video-card">
        <iframe
          className="card-image"
          src={`https://www.youtube.com/embed/${src}`}
          frameborder="0"
        ></iframe>
        <div className="card-image-div"></div>
      </div>

      <div className="text-div">
        <p className=" card-title">{title}</p>
        <p className="nomargin card-description">{channelName}</p>
        <p className="nomargin card-duration">
          <span>{view} views</span>
          <span> • {likes} ago</span>
        </p>
      </div>
    </div>
  );
}