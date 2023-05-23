// i'm using usestate to hold the registration values while the user is filling out the form
import { useState } from "react";
import Jumbotron from "../componets/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
          toast.success("Congratualations Adventurer, you have succesfully registered");
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
  