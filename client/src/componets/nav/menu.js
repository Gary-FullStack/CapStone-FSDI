import { NavLink } from "react-router-dom";


export default function Menu() {
    // use <> React fragment

    return  <>

<ul className="nav d-flex justify-content-between mb-2">
  <li className="nav-item">
    <NavLink className="nav-link" to="/">HOME</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">LOGIN</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/register">REGISTER</NavLink>
  </li>
</ul>

    </>;
    
}
