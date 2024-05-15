import { useState } from "react";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const AddJob = ({token}) => {
  let navigate = useNavigate();
    const [name, setName] = useState("");
    const [company_name, setCompany_name] = useState(""); 
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const addJob = async () => {
    try {
      const { data, error } = await supabase.from("jobs").insert([
        {
          name: name,
          designation: designation,
          description: description,
          skills: skills,
          experience: experience,
          location: location,
          salary: salary,
          created_by: token.user.id,
          company_name: company_name,
        },
      ]);
      // if (error) throw error;
      alert("Job Added");
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

    return ( 
    <>
      <Navbar token={token}/>

        <div class="lg:m-10">
  <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
    <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Add Job</h1>

    <label for="company_name">Company Name</label>
    <input
      id="company_name"
      type="text"
      placeholder="Company Name"
      onChange={(e) => setCompany_name(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="job_role">Job Role</label>
    <input
      id="job_role"
      type="text"
      placeholder="Job Role"
      onChange={(e) => setName(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="designation">Designation</label>
    <input
      id="designation"
      type="text"
      placeholder="Designation"
      onChange={(e) => setDesignation(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="description">Description</label>
    <textarea
      id="description"
      placeholder="Description"
      onChange={(e) => setDescription(e.target.value)}
      className="border mt-2 h-24 w-full rounded-md bg-gray-100 px-3"
    ></textarea>
    
    <label for="skills">Skills</label>
    <input
      id="skills"
      type="text"
      placeholder="Skills"
      onChange={(e) => setSkills(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="experience">Experience</label>
    <input
      id="experience"
      type="text"
      placeholder="Experience"
      onChange={(e) => setExperience(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="location">Location</label>
    <input
      id="location"
      type="text"
      placeholder="Location"
      onChange={(e) => setLocation(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />
    
    <label for="salary">Salary</label>
    <input
      id="salary"
      type="text"
      placeholder="Salary"
      onChange={(e) => setSalary(e.target.value)}
      className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
    />

    <div class="flex justify-between">
      <button className="border mt-2 h-12 w-1/2 rounded-md bg-blue-600 p-2 text-center font-semibold text-white" onClick={() => addJob()}>
        Add Job
      </button>
      <button className="border mt-2 h-12 w-1/2 rounded-md bg-gray-300 p-2 text-center font-semibold" onClick={() => navigate('/dashboard')}>
        Back
      </button>
    </div>
  </form>
</div>



{/* <div class="lg:m-10">
  <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
  <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

  <div class="grid gap-3 md:grid-cols-2">
    <div> 
      <label class=""> First Name </label>
      <input type="text" placeholder="Your Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
    </div>
    <div>
      <label class=""> Last Name </label>
      <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
    </div>
  </div>
  <div>
    <label class=""> Username </label>
    <input type="text" placeholder="Username" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label class=""> Email Address </label>
    <input type="email" placeholder="Info@example.com" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label class=""> Password </label>
    <input type="password" placeholder="******" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div class="grid gap-3 lg:grid-cols-2">
    <div>
      <label class=""> Gender </label>
      <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
        <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
        <label for="select-1" class="flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring">Select Option </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Male</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Female</li>
          <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Other</li>
        </ul>
      </div>
    </div>
    <div>
      <label class=""> Phone: <span class="text-sm text-gray-400">(optional)</span> </label>
      <input type="text" placeholder="+543 5445 0543" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
    </div>
  </div>

  <div class="checkbox">
    <input type="checkbox" id="chekcbox1" checked="" />
    <label for="checkbox1">I agree to the <a href="#" target="_blank" class="text-blue-600"> Terms and Conditions </a> </label>
  </div>

  <div>
    <button type="button" class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Get Started</button>
  </div>
</form>

</div>  */}
    </> 
    );
}
 
export default AddJob;