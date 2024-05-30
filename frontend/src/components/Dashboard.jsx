import supabase from "../supabase/supabase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import GetScore from "./GetScore";
import Footer from "../layouts/Footer";

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
      const { data, error } = await supabase.from("jobs").delete().eq("id", id);

      if (error) {
        throw error;
      }
      console.log("Job deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting job:", error.message);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="">
      <Navbar token={token} />

      <div className="my-10 mx-auto flex w-screen max-w-screen-lg flex-col rounded-3xl bg-gray-100 px-4">
        <p className="mt-20 text-center sm:text-lg font-semibold text-purple-700">
          Automated recruitment system
        </p>
        <h1 className="mx-auto mt-2 max-w-3xl text-center text-md font-semibold leading-tight sm:text-3xl md:text-3xl">
          {" "}
          Seamless Job Creation, Skill-Based Shortlisting, and Top Talent
          Selection: Revolutionizing Recruitment.
        </h1>
        <p className="mx-auto hidden sm:block mt-4 max-w-5xl text-center text-gray-500 sm:mt-8 sm:text-lg">
          Empowering Careers, Connecting Talent: Your Gateway to the Perfect Job
          Match!
        </p>

        <div className="mx-auto mt-8 mb-20 flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate("/allJobsAppliedCandidates")}
            className="rounded-full bg-purple-900 px-10 py-3 font-medium text-white hover:opacity-80 sm:w-auto"
          >
            Applied Candidates
          </button>
          <button
            onClick={() => navigate("/addjob")}
            className="rounded-full border-2 border-purple-900 px-10 py-3 font-medium text-purple-800 transition hover:bg-purple-900 hover:text-white sm:w-auto"
          >
            Add Jobs
          </button>
        </div>
      </div>

      <div className="text-center ">
        <h1 className="text-3xl font-bold mb-4">Manage Your Job Listings</h1>
        <h2 className="text-xl font-medium text-gray-600">
          Add and review your job postings
        </h2>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center ">
          <p className="text-gray-500 mb-4">No jobs added. Add one now!</p>

          <button
            onClick={() => navigate("/addjob")}
            className="rounded-full border-2 border-purple-800 px-10 py-3 font-medium text-purple-800 transition hover:bg-purple-900 hover:text-white sm:w-auto"
          >
            Add Jobs
          </button>
        </div>
      ) : (
        jobs.map((job) => (
          <div class="relative flex  flex-col items-center justify-center overflow-hidden  p-6 sm:py-12 ">
            <div class="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md">
              <div>
                <span class="text-purple-800 text-sm">{job.company_name}</span>
                <h3 class="font-bold mt-px">{job.name}</h3>
                <div class="flex items-center gap-3 mt-2">
                  <span class="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                  <span class="text-slate-600 text-sm flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/appliedcandidates/${job.id}`)}
                  class="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                >
                  Applied Candidates
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
