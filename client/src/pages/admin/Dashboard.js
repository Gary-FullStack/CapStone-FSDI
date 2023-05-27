import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import { NavLink } from 'react-router-dom';


export default function AdminDashboard () {
    const [auth, setAuth] = useAuth ();

    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="Admin Control Panel" />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3">

                        <div className="p-3 mt-2 bg-light">Admin Links</div>

                            <ul className="list-group list-unstyled">
                                <li>
                                    <NavLink className={"list-group-item"} 
                                    to="/dashboard/admin/category">
                                        Create Category
                                    </NavLink>
                                </li>


                            </ul>


                    </div>

                    <div className="col-md-9">Content</div>

                </div>

            </div>
            
           
        </>

        
    );

}