import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
 



export default function UserProfile() {
    const [auth, setAuth] = useAuth ();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");


    useEffect(() => {
        if (auth?.user) {
            const { name, email, address } = auth.user;
            setName(name);
            setEmail(email);
            setAddress(address);
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = axios/PushSubscription("/profile", {
                name, password, address,
            });
            console.log("profile updated =>", data);
        } catch (err) {
            console.log(err)
        }
    };



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
                        <div className="p-3 mt-2 bg-light">User Profile</div>
                        add an update form
                    </div>

                </div>

            </div>
            
           
        </>

        
    );

}