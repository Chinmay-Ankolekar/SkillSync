import { useState, useEffect } from "react";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const AllCandidatesApplied = ({ token }) => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  const getJobIds = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("id")
        .eq("created_by", token.user.id);

      if (error) throw error;

      const jobIds = data.map((job) => job.id);
      return jobIds;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const getUserInfo = async (userIds) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .in("id", userIds);

      if (error) throw error;

      return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const getCandidates = async () => {
    try {
      const jobIds = await getJobIds();

      if (jobIds.length === 0) {
        alert("No jobs registered by the user.");
        navigate("/dashboard");
        return;
      }

      const { data: applications, error } = await supabase
        .from("job_applications")
        .select("user_id, job_id")
        .in("job_id", jobIds);

      if (error) throw error;

      const userIds = applications.map((application) => application.user_id);

      if (userIds.length === 0) {
        console.log("No candidates found for the jobs.");
        return;
      }

      const userInfo = await getUserInfo(userIds);

      // Map job IDs to user info
      const candidatesWithJobs = userInfo.map((user) => {
        const userApplications = applications.filter((app) => app.user_id === user.id);
        const jobIds = userApplications.map((app) => app.job_id);
        return { ...user, jobIds };
      });

      setCandidates(candidatesWithJobs);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      <Navbar token={token} />
      <div className="container mx-auto px-4">
        <div className="mt-6">
          {candidates.length === 0 ? (
            <div className="mt-6 bg-white border border-gray-300 rounded-xl p-4 text-center">
              <p className="text-md font-bold text-gray-500">
                No candidates have applied for this job yet.
              </p>
            </div>
          ) : (
            <>
            <h1 className="text-md font-bold">All Candidates applied for the jobs created by you</h1>
            <div className="mt-6 overflow-hidden rounded-xl border shadow">
                
              <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="border-b lg:table-header-group">
                  <tr>
                    <td
                      width="50%"
                      className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                    >
                      Name
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Email
                    </td>
                    {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Phone No
                    </td> */}
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      JobIds
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Status
                    </td>
                  </tr>
                </thead>
                <tbody className="lg:border-gray-300">
                  {candidates.map((candidate) => (
                    <tr key={candidate.email}>
                      <td
                        width="50%"
                        className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                      >
                        {candidate.fullname}
                        <div className="mt-1 lg:hidden">
                          <p className="font-normal text-gray-500">
                            {candidate.email}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        {candidate.email}
                      </td>
                      {/* <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                        9999999999
                        <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                          9999999999
                        </div>
                      </td> */}
                      <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                        {candidate.jobIds.join(", ")}
                        <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                          {candidate.jobIds.join(", ")}
                        </div>
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        <div className="inline-flex items-center rounded-full bg-purple-800 py-2 px-3 text-xs text-white">
                          Applied
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCandidatesApplied;

