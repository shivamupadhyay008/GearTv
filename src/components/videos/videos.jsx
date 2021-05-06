import { data } from "../../data";
import "./videos.css";
import Vcard from "../vcard/Vcard";
export default function Videos() {
  return (
    <div>
      <div className="videos-div">
        {data.map((item) => {
          return (
            <Vcard
              src={item.id}
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
