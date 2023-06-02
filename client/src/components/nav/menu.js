import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";


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
        <NavLink className="nav-link" to="/shop">SHOP</NavLink>
      </li>  

      <Search />
      
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

        <div className="dropdown"> 
          <li>
              {/* eslint-disable-next-line */}
              <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name}</a>  

              <ul className="dropdown-menu">
                
                <li className="nav-item">
                  <NavLink className="nav-link" 
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`
                  }>Dashboard</NavLink>
                </li>

                <li className="nav-item pointer">
                  {/* eslint-disable-next-line */}
                  <a onClick={logout} className="nav-link">Log-out</a>              
                </li>
              </ul>
          </li>               
        </div> 
      )}

    </ul>
  </>
};
