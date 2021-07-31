import axios from "axios";

const url = "https://geartv-backend.shivam008.repl.co";

export const addPlaylist = async (
  userId,
  playlistName,
  video_id,
  channel_name,
  likes,
  title,
  views
) => {
  try {
console.log("here")
    const response = await axios.post(`${url}/playlist`, {
      userId,
      playlistName,
      video_id,
      channel_name,
      likes,
      title,
      views,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const removePlaylist = async (userId, playlistName,video_id) => {
  try {
    console.log(userId,playlistName,video_id);
    const response = await axios.post(
      `${url}/playlist/delete`,{
          userId,
          playlistName,
          video_id,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const setLikedVideo = async (userId,video_id,channel_name,likes,title,views ) => {
  try {
    const response = await axios.post(`${url}/likedvideo`, {
      userId,
      video_id,
      channel_name,
      likes,
      title,
      views,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const removeLikedVideos = async (userId, video_id) => {
  try {
    console.log("user id", userId,video_id);
    const response = await axios.post(
      `${url}/likedvideo/delete`,{
        userId,
        video_id
      }
    );
    console.log("from response", response);
    return response;
  } catch (error) {
    console.log("message", error.message, error.response.data);
    return error;
  }
};






export const setSavedVideo = async (
  userId,
  video_id,
  channel_name,
  likes,
  title,
  views
) => {
  try {
    const response = await axios.post(`${url}/savedvideo`, {
      userId,
      video_id,
      channel_name,
      likes,
      title,
      views,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const removeSavedVideos = async (userId, video_id) => {
  try {
    console.log("user id", userId, video_id);
    const response = await axios.post(`${url}/savedvideo/delete`, {
      userId,
      video_id,
    });
    console.log("from response", response);
    return response;
  } catch (error) {
    console.log("message", error.message, error.response.data);
    return error;
  }
};

export const userSignup = async (name, email, password) => {
  try {
    console.log("name email", name, email, password);
    const response = await axios.post(`${url}/user/signup`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log("eror", error);
    console.log("response", error);
    console.log("message", error.message, error.response.data);
    return error;
  }
};

export const userLogin = async (email, password, authToken) => {

  try {
    const response = await axios.post(
      `${url}/user/login`,
      {
        email,
        password,
      },
      authToken?{
        headers: {
          authentication: authToken,
        }
      }:{}
    );

    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export const getVideo = async (id) => {
  try {
    const response = await axios.get(`${url}/video/${id}`);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
export const getVideos = async () => {
  try {
    const response = await axios.get(`${url}/video`);
    return response;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
