import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";

const UserDashboard = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  let navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const getJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <Navbar token={token}/>

      <div className="my-10 mx-auto flex w-screen max-w-screen-lg flex-col rounded-3xl bg-green-50 px-4">
      <p className="mt-20 text-center sm:text-lg font-semibold text-lime-500">Our Blog</p>
      <h1 className="mx-auto mt-2 max-w-3xl text-center text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">Resources for makers and creaters to learn, sell & Grow</h1>
      <p className="mx-auto hidden sm:block mt-4 max-w-5xl text-center text-gray-500 sm:mt-8 sm:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis deleniti minus ab aliquam nemo.</p>

      <div className="mx-auto mt-8 mb-20 flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-6">
        <button className="rounded-full bg-black px-10 py-3 font-medium text-white hover:opacity-80 sm:w-auto">Get Started</button>
        <button className="rounded-full border-2 border-black px-10 py-3 font-medium text-black transition hover:bg-black hover:text-white sm:w-auto">View Pricing</button>
      </div>
    </div>

    <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Find your dream job now</h1>
    <h2 className="text-2xl font-medium text-gray-600">5 lakh+ jobs for you to explore</h2>
</div>


      {jobs.length === 0 ? (
        <div className="text-center">
        <p className="text-gray-500 mb-4">No jobs added!</p>
      
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
                <h3 className="text-sm text-gray-600">Company Name: {job.company_name}</h3>
                <a
                  href="#"
                  className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
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
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    Apply Jobs
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        ))
      )}

    </>
  );
};

export default UserDashboard;
