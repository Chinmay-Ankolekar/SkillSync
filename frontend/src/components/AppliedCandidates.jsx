import supabase from "../supabase/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShortlistCandidates from "./ShortlistCandidates";

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
      <h1>Applied Candidates</h1>
      {candidates.map((candidate) => (
        <div key={candidate.id}>
          <br />
          <h1>{candidate.name}</h1>
          <h1>{candidate.email}</h1>
          <br />
        </div>
      ))}

      <ShortlistCandidates token={token} jobId={id} />
    </>
  );
};

export default AppliedCandidates;
