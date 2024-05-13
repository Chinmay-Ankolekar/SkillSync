import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase";

const ApplyJobs = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();

  const getJobswithId = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const applyJob = async (resumeFile) => {
    try {
      const { data: existingApplications, error: existingError } =
        await supabase
          .from("job_applications")
          .select("*")
          .eq("job_id", id)
          .eq("user_id", token.user.id);
      if (existingError) throw existingError;

      if (existingApplications.length > 0) {
        alert("You have already applied for this job.");
        return;
      }

      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .upload(`/resumes/${token.user.id}/${token.user.id}-${id}-${resumeFile.name}`, resumeFile);
      if (fileError) {
        console.log(fileError);
        throw fileError;
      }

      console.log(fileData);

      
      const { data, error } = await supabase.from("job_applications").insert([
        {
          job_id: id,
          user_id: token.user.id,
          resume_url: fileData.fullPath,
        },
      ]);
      if (error) throw error;

      alert("Applied");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getJobswithId();
  }, []);

  return (
    <>
      <h1>Apply Jobs</h1>
      {jobs.map((job) => (
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
      ))}
       <input type="file" onChange={(e) => applyJob(e.target.files[0])} />
    </>
  );
};

export default ApplyJobs;

