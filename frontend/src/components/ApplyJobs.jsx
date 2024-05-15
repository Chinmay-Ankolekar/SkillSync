import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import Navbar from "../layouts/Navbar";

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
        window.location.reload();
        return;
      }

      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .upload(
          `/resumes/${id}/${token.user.id}-${id}-${resumeFile.name}`,
          resumeFile
        );
      if (fileError) {
        console.log(fileError);
        throw fileError;
      }

      console.log(fileData);

      const { data, error } = await supabase.from("job_applications").insert([
        {
          job_id: id,
          user_id: token.user.id,
        },
      ]);
      if (error) throw error;

      alert("Applied");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getJobswithId();
  }, []);

  return (
    <>
     <Navbar token={token} />

     <div class="w-screen bg-white pt-20">
  <main class="relative mx-auto px-10 md:max-w-screen-md">
    {/* <div class="top-20 -left-56 mb-10 w-full max-w-xs rounded-md border bg-white px-6 py-6 shadow-md lg:absolute lg:w-56">
      <div class="pb-2 text-xl font-medium text-orange-600">Table of Contents</div>
      <hr class="h-1 w-10 bg-orange-600" />
      <div class="mt-4">
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-orange-600 hover:text-orange-600" href="#section-one">Section One</a>
        </div>
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-gray-600 hover:text-orange-600" href="#section-two">Section Two</a>
        </div>
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-gray-600 hover:text-orange-600" href="#">How to get Stuff Done</a>
        </div>
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-gray-600 hover:text-orange-600" href="#">Lorem ipsum dolor</a>
        </div>
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-gray-600 hover:text-orange-600" href="#">Are Aliens tiny?</a>
        </div>
        <div class="mb-3">
          <a class="mb-1 text-sm font-medium text-gray-600 hover:text-orange-600" href="#">Ipsum Dolor</a>
        </div>
      </div>
    </div> */}
   <div class="top-20 -left-56 mb-10 w-full max-w-xs rounded-md border bg-white px-6 py-6 shadow-md lg:absolute lg:w-64">
  <div class="pb-2 text-xl font-medium text-orange-600">Apply for Job</div>
  <hr class="h-1 w-10 bg-orange-600" />
  <div class="mt-4">
    <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700">
      Upload Your Resume
    </label>
    <input
      id="resume-upload"
      type="file"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e) => applyJob(e.target.files[0])}
    />
    <p className="mt-2 text-sm text-gray-500">
      <span className="font-semibold">Note:</span>
       By uploading your resume, you are applying for the job.
    </p>
  </div>
</div>


    <article class="text-gray-800 mb-10 ml-5">
      {/* <h2 id="section-one" class="mb-4 text-3xl font-bold">Section One</h2>
      <p class="mb-10 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quae asperiores error hic minima dicta. Assumenda, enim. Voluptate facere ea eveniet quaerat neque ipsam iste corrupti sapiente sed! Temporibus, magni?</p>
      <p class="mb-10 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quasi! Vitae voluptatibus, illum voluptatum dolores excepturi, architecto rem voluptatem minus nulla expedita tempore, ratione non animi dicta eum consequatur nam hic veniam accusantium vel? Cumque magni provident eius temporibus soluta iusto corporis vel eum at consectetur architecto eos nisi voluptas quas natus dolores, reiciendis incidunt esse inventore ab impedit quos. Expedita exercitationem qui quae architecto libero reiciendis laborum nostrum commodi, omnis vero, earum dicta provident! Necessitatibus cupiditate, voluptate eos est incidunt soluta nam voluptatum? Quidem repellendus neque enim quos nobis ex fugiat autem placeat officia illum inventore, itaque quibusdam rerum?</p>
      <h2 id="section-two" class="mb-4 text-3xl font-bold">Section Two</h2>
      <p class="mb-10 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quasi! Vitae voluptatibus, illum voluptatum dolores excepturi, architecto rem voluptatem minus nulla expedita tempore, ratione non animi dicta eum consequatur nam hic veniam accusantium vel? Cumque magni provident eius temporibus soluta iusto corporis vel eum at consectetur architecto eos nisi voluptas quas natus dolores, reiciendis incidunt esse inventore ab impedit quos. Expedita exercitationem qui quae architecto libero reiciendis laborum nostrum commodi, omnis vero, earum dicta provident! Necessitatibus cupiditate, voluptate eos est incidunt soluta nam voluptatum? Quidem repellendus neque enim quos nobis ex fugiat autem placeat officia illum inventore, itaque quibusdam rerum?</p> */}

      <div>
        <h2 class="text-3xl font-bold ">Job Information</h2>
        {jobs.map((job) => (
          <div key={job.id} className="mt-6">
            <h3 class="text-2xl font-semibold">{job.name}</h3>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Company:</span> {job.company_name}</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Designation:</span> {job.designation}</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Description</span> {job.description}</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Skills:</span> {job.skills}</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Experience:</span> {job.experience} Years</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Location:</span> {job.location}</p>
            <p class="mt-2 text-gray-600 "><span className="font-semibold">Salary:</span> {job.salary}</p>
          </div>
        ))}
      </div>
    </article>
  </main>
</div>






      {/* <h1>Apply Jobs</h1>
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
      <input type="file" onChange={(e) => applyJob(e.target.files[0])} /> */}
    </>
  );
};

export default ApplyJobs;
