import { data } from "../../data";
import "./videos.css";
import Vcard from "../vcard/Vcard";
import { useUser } from "../../context/usercontext";
export default function Videos() {
  const { state } = useUser();
  const { search } = state;
  const filterData = (data, searchByText) => {
    return data.filter((a) => {
      let reg = new RegExp(searchByText, "ig");
      return reg.test(a.title);
    });
  };
  const fdata = filterData(data, search);
  return (
    <div>
      <div className="videos-div">
        {fdata.map((item) => {
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
