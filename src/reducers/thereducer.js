import {
  handleUserData,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  setPlaylist,
  setLikedVideo,
  setSavedVideo,
} from "./reducer.utils/index";
export default function theReducer(state, action) {
  switch (action.type) {
    case "OPEN_LOADER":
      return { ...state, isLoading: true };
    case "CLOSE_LOADER":
      return { ...state, isLoading: false };
    case "LOGIN":
      return handleUserData(state, action.payload);
    case "SET_LIKEDVIDEO":
      return setLikedVideo(state, action.payload);
    case "SET_SAVEDVIDEO":
      return setSavedVideo(state, action.payload);
    case "SET_PLAYLIST":
      return setPlaylist(state, action.payload);
    case "CREATE_PLAYLIST":
      return createPlaylist(state, action.payload);
    case "ADD_TO_PLAYLIST":
      return addToPlaylist(state, action.payload);
    case "REMOVE_FROM_PLAYLIST":
      return removeFromPlaylist(state, action.payload);
    case "LOGOUT":
      return {
        ...state,
        userData:{} ,
        playlists:[],
        likedVideos:[],
        savedVideos: [],
      };
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
