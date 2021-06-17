import { createContext, useContext, useReducer } from "react";
import theReducer from "../reducers/thereducer";
export const userContext = createContext();
export const UserProvider = ({ children }) => {
  const userData={
    isUserLoggedIn:false,
    userId:"",
    name:"",
    email:"",
  };
  const isLoading=false;
  const likedVideos = [];
  const savedVideos = [];
  const search = "";
  const playlists = [
    {
      name: "Playlist",
      videos: [],
    }
  ];
  const [state, dispatch] = useReducer(theReducer, {
    isLoading,
    userData,
    likedVideos,
    savedVideos,
    playlists,
    search,
  });
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
