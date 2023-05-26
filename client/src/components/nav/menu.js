import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";


export default function Menu() {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user:null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

    // use <> React fragment
  return  <>

    <ul className="nav d-flex justify-content-between mb-2">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">HOME</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard/secret">SECRET</NavLink>
      </li>

      {!auth?.user ? (
          <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">LOGIN</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">REGISTER</NavLink>
          </li>
          
        </>
      ) : (
        <li className="nav-item pointer">
          <a onClick={logout} className="nav-link">LOG-OUT</a>
      </li>)}

      

    </ul>

  </>;
    
};
