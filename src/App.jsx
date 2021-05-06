import { useState } from "react";
import "./styles.css";
import UserVideoListing from "./components/listing/listing"
import Navbar from "./components/navbar/navbar";
import Vcard from "./components/vcard/Vcard";
import VideoPage from "./components/videopage/videopage";
import Videos from "./components/videos/videos";
import {  Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Navbar />

    <Routes>
      <Route path="/" element={<Videos/>}/>
      <Route path="/watch/:id" element={<VideoPage/>}/>
      <Route path="/uservideos" element={<UserVideoListing/>}/>
    </Routes>
    </div>
  );
}
