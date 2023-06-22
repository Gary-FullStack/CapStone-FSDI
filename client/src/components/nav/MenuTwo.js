import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

export default function Menu()  {


    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const categories  = useCategory();    
    const navigate = useNavigate();

    


    const logout = () => {
        setAuth({ ...auth, user:null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login");
      };


    return <>


    <div>
        <nav>
            <ul>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">HOME</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/shop">SHOP</NavLink>
                </li>


                <li><a href="/products">Products</a></li>
                <li><a href="/about">About</a></li>
                <li id="login"><a href="/login" >Login</a></li>
                <li id="signup"><a href="/signup">Signup</a></li>
            </ul>
        </nav>
    </div>

    <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <ul class="mobile-menu">
            <li><a href="/home">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li id="login"><a href="/login" >Login</a></li>
            <li id="signup"><a href="/signup">Signup</a></li>
            </ul>
    </div>



    </>

};