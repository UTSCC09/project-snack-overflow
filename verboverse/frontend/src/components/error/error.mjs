import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Error = () =>{
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
    const error = data.state.errormessage;
    return(
        <div>
            <button onClick={gotohome}>Home Page</button>
            <p>{error}</p>
        </div>
    )
}

export default Error;