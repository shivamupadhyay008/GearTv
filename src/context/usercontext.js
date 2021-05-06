import { createContext, useContext, useReducer } from "react";
import theReducer from "../reducers/thereducer"

export const userContext =createContext();

export const UserProvider=({children})=>{
    const likedVideos=[];
    const savedVideos=[];
    const playlist=[];
    const [state,dispatch]=useReducer(theReducer,{likedVideos,savedVideos,playlist})
return(
    <userContext.Provider value={{state,dispatch}}>
        {children}
    </userContext.Provider>
)
}

export const useUser=()=>{
return useContext(userContext);
}