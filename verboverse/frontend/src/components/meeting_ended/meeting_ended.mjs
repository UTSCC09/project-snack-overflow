import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Meeting_ended = () =>{
    useEffect(() =>{
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 2) {
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
            <button onClick={gotohome}>Home Page</button>
            <p>{data.state.privilege} Ended the Meetinb</p>
        </div>
    )
}

export default Meeting_ended;