import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Dashboard({ token }) {
  const [jobs, setJobs] = useState([]);

  let navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const getJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*").eq('created_by',token.user.id);
      if (error) throw error;
      setJobs(data); 
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getJobs();
  }, []) 

  return (
    <div>
      <h1>Automatic Recruitment System</h1>
      <h1>HR Dashboard</h1>
      <h1>Welcome to the Dashboard</h1>
      <button className="border" onClick={Logout}>
        Logout
      </button>
      <br />
      <button className="border" onClick={()=> navigate('/addjob')}>Add Job</button>
      <br />
      <br />
      {
    jobs.length === 0 ? (
        <p>No jobs</p>
    ) : (
        jobs.map((job) => (
            <div key={job.id}>
                <h1>{job.company_name}</h1>
                <h1>{job.name}</h1>
                <h3>{job.designation}</h3>
                <p>{job.description}</p>
                <p>{job.skills}</p>
                <p>{job.experience}</p>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <br />
                <br />
            </div>
        ))
    )
}

    </div>
  );
}

export default Dashboard;
