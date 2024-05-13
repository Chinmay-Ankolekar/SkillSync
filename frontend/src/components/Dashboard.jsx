import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import GetScore from "./GetScore";

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
      <Navbar/>


      {
            jobs.length === 0 ? (
                <p>No jobs</p>
            ) : (
                jobs.map((job) => (
                    <div class="m-5" key={job.id}>
                    <div class="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                      <a href="#" class="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                        <div class="group relative h-16 w-16 overflow-hidden rounded-lg">
                          <img src="src\assets\netapp-101.png" alt="" class="h-full w-full object-cover text-gray-700" />
                        </div>
                      </a>
                      <div class="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                        <h3 class="text-sm text-gray-600">{job.company_name}</h3>
                        <a href="#" class="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"> {job.name} </a>
                        <p class="overflow-hidden pr-7 text-sm">{job.description}</p>
                  
                        <div class="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                          <div class="">Experience:<span class="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> {job.experience} Years </span></div>
                          <div class="">Salary:<span class="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{job.salary}</span></div>
                          

                        </div>
                        <button className="w-44 mt-5 inline-flex items-center rounded-lg bg-blue-500 text-white px-4 py-2 text-md font-semibold shadow-md hover:bg-blue-600" onClick={() => navigate(`/appliedcandidates/${job.id}`)}>
  Applied Candidates
  <i className="fa-solid fa-arrow-right"></i>
</button>

                      </div>
                    </div>
                  </div>
                ))
            )
        }


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

<GetScore token={token}/>


    </div>
  );
}

export default Dashboard;
