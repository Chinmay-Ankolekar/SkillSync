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
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("created_by", token.user.id);
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
        const { data, error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        console.log('Job deleted successfully');
        window.location.reload();
    } catch (error) {
        console.error('Error deleting job:', error.message);
    }
};

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <Navbar token={token} />

      <div className="my-10 mx-auto flex w-screen max-w-screen-lg flex-col rounded-3xl bg-green-50 px-4">
      <p className="mt-20 text-center sm:text-lg font-semibold text-lime-500">Our Blog</p>
      <h1 className="mx-auto mt-2 max-w-3xl text-center text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">Resources for makers and creaters to learn, sell & Grow</h1>
      <p className="mx-auto hidden sm:block mt-4 max-w-5xl text-center text-gray-500 sm:mt-8 sm:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis deleniti minus ab aliquam nemo.</p>

      <div className="mx-auto mt-8 mb-20 flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-6">
        <button  className="rounded-full bg-black px-10 py-3 font-medium text-white hover:opacity-80 sm:w-auto">Applied Candidates</button>
        <button onClick={() => navigate("/addjob")} className="rounded-full border-2 border-black px-10 py-3 font-medium text-black transition hover:bg-black hover:text-white sm:w-auto">Add Jobs</button>
      </div>
    </div>

    <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Manage Your Job Listings</h1>
    <h2 className="text-xl font-medium text-gray-600">Add and review your job postings</h2>
</div>


      {jobs.length === 0 ? (
       <div className="text-center">
       <p className="text-gray-500 mb-4">No jobs added. Add one now!</p>
       
  <button onClick={() => navigate("/addjob")} className="rounded-full border-2 border-black px-10 py-3 font-medium text-black transition hover:bg-black hover:text-white sm:w-auto">Add Jobs</button>
  
   </div>
      
      ) : (
        jobs.map((job) => (
          <div className="m-5" key={job.id}>
            <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
              <a
                href="#"
                className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
              >
                <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                  <img
                    src="src\assets\netapp-101.png"
                    alt=""
                    className="h-full w-full object-cover text-gray-700"
                  />
                </div>
              </a>
              <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                <h3 className="text-lg font-semibold text-gray-800">Company: {job.company_name}</h3>
                <a
                  href="#"
                  className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-md"
                >
                  {" "}
                  Role: {job.name}{" "}
                </a>
                <p class="overflow-hidden pr-7 text-sm">Required Skills: {job.skills}</p>
 

        
                <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                  <div>
                    Experience:
                    <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                      {" "}
                      {job.experience} Years{" "}
                    </span>
                  </div>
                  <div>
                    Salary:
                    <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="mt-5 ">
                  <button
                    className="w-38 mt-1 mr-3 inline-flex items-center rounded-md bg-green-500 px-10 py-3 font-medium text-white hover:opacity-80"
                    onClick={() => navigate(`/appliedcandidates/${job.id}`)}
                  >
                    Candidates
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  <button
                    className="w-38 mt-1 inline-flex items-center rounded-md bg-red-500 px-10 py-3 font-medium text-white hover:opacity-80"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete Job
                    <i className="fa-solid fa-trash-can ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* <h1>Automatic Recruitment System</h1>
      <h1>HR Dashboard</h1>
      <h1>Welcome to the Dashboard</h1>
      <button className="border" onClick={Logout}>
        Logout
      </button>
      <br />
      <button className="border" onClick={() => navigate("/addjob")}>
        Add Job
      </button>
      <br />
      <br />
      {jobs.length === 0 ? (
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
      )}

      <GetScore token={token} /> */}
    </div>
  );
}

export default Dashboard;
