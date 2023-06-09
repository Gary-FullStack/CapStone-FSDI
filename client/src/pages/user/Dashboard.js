import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import UserMenu from "../../components/nav/UserMenu";



export default function UserDashboard () {
    const [auth, setAuth] = useAuth ();

    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="User Control Panel" />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3">  
                        <UserMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="p-3 mt-2 bg-light">User Account Info</div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                {auth?.user?.name}
                            </li>
                            <li className="list-group-item">
                                {auth?.user?.email}
                            </li>
                            <li className="list-group-item">
                                User role: Customer
                            </li>


                        </ul>


                    </div>

                </div>

            </div>
            
           
        </>

        
    );

}