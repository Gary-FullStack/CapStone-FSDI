import { useContext } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";


export default function Home() {
  const [auth, setAuth] = useAuth();

    return (
  
      <div> 
        <Jumbotron title="Home" subTitle="Welcome, Adventurer!"/>
              
      </div>
    );
  }
  
  