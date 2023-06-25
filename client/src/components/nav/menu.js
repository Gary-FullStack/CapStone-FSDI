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

    const closeNav = () => {
      setToggleMenu(false)
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
        <nav className="sticky-top justify-content-between">
        {/* logic for the toggle menu */}
        {(toggleMenu || screenWidth > 500 ) && (

          <ul className="list">
            <li className="items">
                <NavLink className="nav-link" to="/" onClick={closeNav} >HOME</NavLink>
            </li>

            <li className="items">
                <NavLink className="nav-link" to="/shop" onClick={closeNav} >SHOP</NavLink>
            </li>

            <div className="dropdown"> 
          <li>
              {/* eslint-disable-next-line */}
              <a className="nav-link pointer dropdown-toggle items"
               data-bs-toggle="dropdown">CATEGORIES</a>  

                <ul className="dropdown-menu" style={{ height: "300px", overflow: "scroll"}}>

                    <li >
                     <NavLink className="nav-link" to="/categories" onClick={closeNav} >All categories</NavLink>
                    </li>

                  {categories?.map((c) => (
                    <li key={c.name}>                      
                      <NavLink className="nav-link" 
                      to={`/category/${c.slug}`}onClick={closeNav} >{c.name}</NavLink>                      
                    </li> 
                  ))}     
                </ul>
          </li>               
        </div>

            <li className="items">
            <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[11, 9]}
            showZero={true}
              >
            <NavLink className="nav-link items" aria-current="page" to="/cart" onClick={closeNav}>
              CART
            </NavLink>
          </Badge>
          </li>

          <Search />


          {!auth?.user ? (
            <>
              <li className="items">
                <NavLink className="nav-link items" to="/login" onClick={closeNav}>LOGIN</NavLink>
              </li>
              <li className="items">
                <NavLink className="nav-link items" to="/register" onClick={closeNav}>REGISTER</NavLink>
              </li>          
            </>
          ) : (

        <div className="dropdown"> 
          <li>
              {/* eslint-disable-next-line */}
              <a className="nav-link pointer dropdown-toggle items" 
              data-bs-toggle="dropdown">{auth?.user?.name?.toUpperCase()}</a>  

              <ul className="dropdown-menu">
                
                <li>
                  <NavLink className="nav-link" 
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`
                  } onClick={closeNav}>Dashboard</NavLink>
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



