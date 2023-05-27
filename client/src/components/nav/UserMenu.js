import { NavLink } from 'react-router-dom';


export default function UserMenu() {

    return (

        <>
            <div className="p-3 mt-2 bg-light">User Account Links</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className={"list-group-item"} 
                    to="/dashboard/user/profile">
                        Profile Update
                    </NavLink>
                </li>

                <li>
                    <NavLink className={"list-group-item"} 
                    to="/dashboard/user/orders">
                        Order History
                    </NavLink>
                </li>


            </ul>
                                
        </>

    );
}