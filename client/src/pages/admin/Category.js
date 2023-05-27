import { useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import AdminMenu from "../../components/nav/AdminMenu"
import axios from "axios";
import toast from 'react-hot-toast';


export default function AdminCategory() {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post('/category', { name });
            if(data?.error) {
                toast.error(data.error);
            }else {
                setName("");
                toast.success(`${data.name} has been created.`);
            }
            
        } catch (err) {
            console.log(err);
            toast.error("Submit failed, try again.");

        }
    };

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
                        <div className="p-3 mt-2 bg-light">Manage Inventory</div>

                        <div className="p-3">

                            <form onSubmit={handleSubmit}>
                                <input type="text" className="form-control p-3" 
                                placeholder="Enter a category name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                                <button className="btn btn-primary mt-3">Click to Submit</button>
                            </form>

                        </div>
                        
                    </div>

                </div>

            </div>
            
           
        </>

        
    );

}