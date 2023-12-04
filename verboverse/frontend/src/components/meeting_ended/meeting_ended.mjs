import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Meeting_ended = () =>{
    useEffect(() =>{
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
    }, []);
    const data = useLocation();
    const navigate = useNavigate();
    const gotohome = () => {
        navigate('/');
    }
    return(
        <div>
            <h4>{data.state.privilege} Ended the Meeting</h4>
            <button className="btn btn_pink small_btn" onClick={gotohome}>Home Page</button>
        </div>
    )
}

export default Meeting_ended;