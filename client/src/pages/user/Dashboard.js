import { useAuth } from "../../context/auth";
import Jumbotron from './../../components/cards/Jumbotron';


export default function UserDashboard () {
    const [auth, setAuth] = useAuth ();

    return (
        <>
            <Jumbotron title={`Welcome ${auth?.user?.name}`}
            subTitle="User Control Panel" />           
            
        </>

        
    );

}