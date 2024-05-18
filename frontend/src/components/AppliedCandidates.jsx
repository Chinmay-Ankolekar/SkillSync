import supabase from "../supabase/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShortlistCandidates from "./ShortlistCandidates";
import Navbar from "../layouts/Navbar";

const AppliedCandidates = ({ token }) => {
  let { id } = useParams();
  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    try {
      const { data: applications, error: applicationsError } = await supabase
        .from("job_applications")
        .select("user_id")
        .eq("job_id", id);

      if (applicationsError) throw applicationsError;

      const userIds = applications.map((app) => app.user_id);
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, fullname, email")
        .in("id", userIds);

      if (usersError) throw usersError;

      const candidates = usersData.map((user) => ({
        id: user.id,
        name: user.fullname,
        email: user.email,
      }));
      setCandidates(candidates);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
     <Navbar token={token} />

     <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap" rel="stylesheet" />

<div class="w-screen">
  
<div class="mx-auto mt-8 max-w-screen-lg px-2">
  <div class="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
    <p class="flex-1 text-base font-bold text-gray-900">Candidates list</p>

    
  </div>
  {
  candidates.length === 0 ? (
    <div className="mt-6 bg-white border border-gray-300 rounded-xl p-4 text-center">
      <p className="text-sm text-gray-500">No candidates have applied for this job yet.</p>
    </div>
  ) : (
    <div className="mt-6 overflow-hidden rounded-xl border shadow">
  <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
    <thead className="border-b lg:table-header-group">
      <tr>
        <td width="50%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Name</td>
        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Email</td>
        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Phone No</td>
        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
      </tr>
    </thead>
    <tbody className="lg:border-gray-300">
      {candidates.map((candidate) => (
        <tr key={candidate.email}>
          <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
            {candidate.name}
            <div className="mt-1 lg:hidden">
              <p className="font-normal text-gray-500">{candidate.email}</p>
            </div>
          </td>
          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
            {candidate.email}
          </td>
          <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
            9999999999
            <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
              Applied
            </div>
          </td>
          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
            <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
              Applied
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}


  
</div>

</div>

      <ShortlistCandidates token={token} jobId={id} />
    </>
  );
};

export default AppliedCandidates;
