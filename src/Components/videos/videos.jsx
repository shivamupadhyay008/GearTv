import "./videos.css";
import {Vcard} from "../vcard/Vcard";
import { useUser } from "../../context/usercontext";
import { useEffect, useState } from "react";
import { getVideos } from "../../apis/api.utils";
export function Videos() {
  const { state ,dispatch} = useUser();
  const { search } = state;
  const [videoData,setVidoes]=useState(null);
  useEffect(()=>{
    dispatch({type:"OPEN_LOADER"});
    (async ()=>{
      const response = await getVideos();
      console.log(response.data);
      setVidoes(response.data.videos);
    })();
      dispatch({ type: "CLOSE_LOADER" });
  },[])
  const filterData = (data, searchByText) => {
    return data && data.filter((a) => {
      let reg = new RegExp(searchByText, "ig");
      return reg.test(a.title);
    });
  };
  const fdata = filterData(videoData, search);
  return (
    <div>
      <div className="videos-div">
        {fdata && fdata.map((item) => {
          return (
            <Vcard
              src={item.video_id}
              title={item.title}
              view={item.views}
              likes={item.likes}
              channelName={item.channel_name}
            />
          );
        })}
      </div>
    </div>
  );
}
