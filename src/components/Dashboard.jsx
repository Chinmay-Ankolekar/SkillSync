import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";

function Dashboard({ token }) {
    let navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>automatic recruitment system</h1>
      <h1> HR Dashboard</h1>
      <h1>Welcome to the Dashboard</h1>
      <button className="border" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
