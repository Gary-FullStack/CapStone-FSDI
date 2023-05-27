import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import AdminMenu from "../../components/nav/AdminMenu";




export default function AdminProduct() {
    const [auth, setAuth] = useAuth ();

    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="Admin Control Panel" />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3">  
                        <AdminMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="p-3 mt-2 bg-light">Create new Inventory</div>

                        <p> to do:  create prods form</p>
                        
                    </div>

                </div>

            </div>
            
           
        </>

        
    );

}