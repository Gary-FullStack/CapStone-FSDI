import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// this function sneds a message to an unauthed user trying to access protected routes 
// and then redirects to log in.

export default function Loading() {

    const [count, setCount] = useState(4);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() =>{
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && navigate("/login");

        return () => clearInterval(interval);
    }, [count]);

    return  <div className="d-flex justify-content-center align-items-center vh-100">
     You need to log in for that, redirecting you in {count} seconds.
      </div>;
    
};