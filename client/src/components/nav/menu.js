import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";


export default function Menu() {

    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const categories  = useCategory();    
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

       <div className="dropdown"> 
          <li>
              {/* eslint-disable-next-line */}
              <a className="nav-link pointer dropdown-toggle"
               data-bs-toggle="dropdown">CATEGORIES</a>  

                <ul className="dropdown-menu" style={{ height: "300px", overflow: "scroll"}}>

                    <li className="nav-item">
                     <NavLink className="nav-link" to="/categories">All categories</NavLink>
                    </li>

                  {categories?.map((c) => (
                    <li className="nav-item">
                      <Badge 
                      count={cart?.length >= 1 ? cart.length : 0} offset={[-5, 13]} showZero={true}>
                        <NavLink className="nav-link" to={`/category/${c.slug}`}>{c.name}</NavLink>
                      </Badge>
                    </li>
                  ))}     
                </ul>
          </li>               
        </div> 

        <li className="nav-item">
          <NavLink className="nav-link" to="/cart">CART</NavLink>
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
              <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name?.toUpperCase()}</a>  

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
