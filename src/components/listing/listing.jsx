import "./listing.css";
import { Listingcard } from "../vcard/Vcard";
import { useUser } from "../../context/usercontext";
export default function UserVideoListing() {
  const { state } = useUser();
  const { likedVideos, savedVideos, playlist } = state;
  console.log(likedVideos);
  return (
    <div className="listing-div">
      <section>
        <h1 className="section-title">Liked Videos</h1>
        <div className="listing-videos-div">
          {likedVideos.length == 0 ? <h2>Nothings to show</h2> : ""}
          {likedVideos.map((item) => {
            return (
              <Listingcard
                src={item.id}
                title={item.title}
                view={item.views}
                likes={item.likes}
                channelName={item.channel_name}
              />
            );
          })}
        </div>
      </section>
      <section>
        <h1 className="section-title">Saved Videos</h1>
        <div className="listing-videos-div">
          {savedVideos.length == 0 ? <h2>Nothings to show</h2> : ""}
          {savedVideos.map((item) => {
            return (
              <Listingcard
                src={item.id}
                title={item.title}
                view={item.views}
                likes={item.likes}
                channelName={item.channel_name}
              />
            );
          })}
        </div>
      </section>
      <section>
        <h1 className="section-title">PlayList</h1>
        <div className="listing-videos-div">
          {playlist.length == 0 ? <h2>Nothings to show</h2> : ""}
          {playlist.map((item) => {
            return (
              <Listingcard
                src={item.id}
                title={item.title}
                view={item.views}
                likes={item.likes}
                channelName={item.channel_name}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
