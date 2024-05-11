import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";

const UserDashboard = ({token}) => {
    let navigate = useNavigate();
    const Logout = () => {
      sessionStorage.removeItem("token");
      navigate("/");
    };

    return ( 
        <>
            <h1>User Dashboard</h1>
            <button className="border" onClick={Logout}>
                Logout
            </button>
        </>
     );
}
 
export default UserDashboard;