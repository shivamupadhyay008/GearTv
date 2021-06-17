import "./loader.css";
import {useUser} from "../../context/usercontext";
export function Loader() {
  const {state:{isLoading}}=useUser();
  return (
    <div className={`spinner-div ${isLoading ?" ":`dis-none`}`}>
      <div className="nb-spinner"> </div>
    </div>
  );
}
