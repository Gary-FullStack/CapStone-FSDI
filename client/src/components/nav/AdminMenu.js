import { NavLink } from 'react-router-dom';


export default function AdminMenu() {

    return (

        <>
            <div className="p-3 mt-2 bg-light">Admin Links</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className={"list-group-item"} 
                    to="/dashboard/admin/category">
                        Create a Category
                    </NavLink>
                </li>

                <li>
                    <NavLink className={"list-group-item"} 
                    to="/dashboard/admin/product">
                        Add a new Product
                    </NavLink>
                </li>


            </ul>
                                
        </>

    );
}