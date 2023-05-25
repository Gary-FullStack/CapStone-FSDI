// i'm using usestate to hold the registration values while the user is filling out the form
import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";


export default function Register() {

    // use states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // I am preventing the default reloading of the page after submit.
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const { data } = await axios.post(`${process.env.REACT_APP_API}/register`, 
        {name, email, password});
        console.log(data);

        if(data?.error) {
          toast.error(data.error);
        } else {          
          // save register data in local storage
          localStorage.setItem("auth", JSON.stringify(data));

          // after success use hook to set the context with specific data
          setAuth({ ...auth, token: data.token, user: data.user});
          toast.success("Congratualations Adventurer, you have succesfully registered");
          // and then redirect the user 
          navigate("/dashboard");
        }
        
      }catch (err) {
        console.log(err);
        toast.error("Whoa now, something went wrong, try again.")
      }
    };
    return (
  
      <div> 
        <Jumbotron title="Register" subTitle="Adventurer, please register for an account here!"/>          

        <div className="container mt-5">

          <div className="row">

            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-4 p-2" 
                placeholder="Enter your name"
                value={name} 
                // the entered value is saved in the useState
                onChange={(e) => setName(e.target.value)}
                autoFocus  
                />

                <input type="email" className="form-control mb-4 p-2" 
                placeholder="Enter your E-mail address"
                value={email} 
                // the entered value is saved in the useState
                onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password" className="form-control mb-4 p-2" 
                placeholder="Enter your password"
                value={password} 
                // the entered value is saved in the useState
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
              </form>

            </div>

          </div>

        </div>
      
      </div>
    );
}
  