export default function theReducer(state,action){
    const {likedVideos,savedVideos,playlist}=state;
    switch (action.type) {
        case "LIKE":
            if(likedVideos.length==0 ||!likedVideos.some((item)=>item.id==action.payload.id))
            {
                return{
                ...state,
                likedVideos:[...likedVideos,action.payload]
                }
            }else{
                return state;
            }
            break;

            case "SAVE":
            if(savedVideos.length==0 ||!savedVideos.some((item)=>item.id==action.payload.id))
            {
                return{
                ...state,
                savedVideos:[...savedVideos,action.payload]
                }
            }else{
                return state;
            }
            break;
            case "PLAYLIST":
                if(playlist.length==0 ||!playlist.some((item)=>item.id==action.payload.id))
                {
                    return{
                    ...state,
                    playlist:[...playlist,action.payload]
                    }
                }else{
                    return state;
                }
                break;
        default:
            return state;
            break;
    }

}