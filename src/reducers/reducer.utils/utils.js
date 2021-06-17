export function createPlaylist(state, payload) {
  const { playlists } = state;
  const isPlaylist = playlists.some((item) => item.name === payload.name);
  if (!isPlaylist) {
    playlists.push({ name: payload.name, videos: [] });
  }
  return { ...state, playlists };
}

export function addToPlaylist(state, payload) {
  const { id, channel_name, likes, title, views } = payload;
  const { playlists } = state;
  const isPlaylist = playlists.find(
    (item) => item.name === payload.playlistName
  );
  const isVideo = isPlaylist.videos.find((item) => item.id === payload.id);
  if (!isVideo) {
    isPlaylist.videos.push({ id, channel_name, likes, title, views });
  }
  return { ...state, playlists: playlists };
}

export function removeFromPlaylist(state, payload) {
  const { id } = payload;
  const { playlists } = state;
  const isPlaylist = playlists.find(
    (item) => item.name === payload.playlistName
  );
  const isVideo = isPlaylist.videos.find((item) => item.id === id);
  if (isVideo) {
    isPlaylist.videos = isPlaylist.videos.filter((item) => item.id !== id);
  }
  return { ...state, playlists: playlists };
}

export function handleUserData(state, payload) {

  const { userData } = state;
  const newUserData = {
    ...userData,
    isUserLoggedIn: true,
    userId: payload.user.id,
    email: payload.user.email,
    name: payload.user.name,
  };
  return {
    ...state,
    userData: newUserData,
    playlists: payload.playlists,
    likedVideos: payload.likedVideos,
    savedVideos: payload.savedVideos,
  };
}
export function setPlaylist(state,payload){
console.log("before",payload)
return {...state,playlists:payload};
};

export function setLikedVideo(state, payload) {
  console.log("before", payload);
  return { ...state, likedVideos: payload };
};

export function setSavedVideo(state, payload) {
  console.log("before", payload);
  return { ...state, savedVideos: payload };
};