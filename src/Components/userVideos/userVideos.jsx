import "./uservideos.css";
import { Listingcard } from "../vcard/Vcard";
import { useUser } from "../../context/usercontext";
export function UserVideoListing() {
  const { state } = useUser();
  const { likedVideos, savedVideos, playlists } = state;
  return (
    <div className="listing-div">
      <section className="usr-vd-section">
        <h1 className="section-title">Liked Videos</h1>
        <div className="listing-videos-div">
          {likedVideos.length === 0 ? (
            <h2 className="h-err">Nothings to show</h2>
          ) : (
            ""
          )}
          {likedVideos.map((item) => {

            return (
              <Listingcard
                src={item.video_id}
                title={item.title}
                view={item.views}
                likes={item.likes}
                channelName={item.channel_name}
              />
            );
          })}
        </div>
      </section>
      <section className="usr-vd-section">
        <h1 className="section-title">Saved Videos</h1>
        <div className="listing-videos-div">
          {savedVideos.length === 0 ? (
            <h2 className="h-err">Nothings to show</h2>
          ) : (
            ""
          )}
          {savedVideos.map((item) => {
            return (
              <Listingcard
                src={item.video_id}
                title={item.title}
                view={item.views}
                likes={item.likes}
                channelName={item.channel_name}
              />
            );
          })}
        </div>
      </section>
      {playlists.map((item) => {
        return (
          <section className="usr-vd-section" >
            <h1 className="section-title">{item.name}</h1>
            <div className="listing-videos-div">
              {item.videos.length === 0 ? (
                <h2 className="h-err">Nothings to show</h2>
              ) : (
                ""
              )}
              {item.videos.map((item) => {
                console.log("someting ", item);
                return (
                  <Listingcard
                    src={item.video_id}
                    title={item.title}
                    view={item.views}
                    likes={item.likes}
                    channelName={item.channel_name}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
