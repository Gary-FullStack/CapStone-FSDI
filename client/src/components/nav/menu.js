import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Menu.css";

export default function Menu()  {


    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const categories  = useCategory();    
    const navigate = useNavigate();

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
      setToggleMenu(!toggleMenu)
    }

  //  Check screen width state and clean up for the toggle menu
    useEffect(() => {

      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', changeWidth)

      return () => {
        window.removeEventListener('resize', changeWidth)
    }
  
    }, [])

    


    const logout = () => {
        setAuth({ ...auth, user:null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login");
    };



    return (
        <nav className="nav d-flex justify-content-between mb-2 sticky-top bg-light">
        {/* logic for the toggle menu */}
        {(toggleMenu || screenWidth > 500 ) && (

          <ul className="list">
            <li className="items">
                <NavLink className="nav-link" to="/">HOME</NavLink>
            </li>

            <li className="items">
                <NavLink className="nav-link" to="/shop">SHOP</NavLink>
            </li>

            <li className="items">
            <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[11, 9]}
            showZero={true}
              >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
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
              <a className="nav-link pointer dropdown-toggle" 
              data-bs-toggle="dropdown">{auth?.user?.name?.toUpperCase()}</a>  

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

    )}
          <button onClick={toggleNav} className="burger">Menu</button>


  </nav>
)
    



};



