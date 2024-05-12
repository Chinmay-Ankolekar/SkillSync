import { useState } from "react";
import supabase from "../supabase/supabase";

const AddJob = ({token}) => {
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
      if (error) throw error;
      alert("Job Added");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.message);
    }
  };

    return ( 
    <>
        <div>
      <h1>Add Jobs</h1>
      <input
        type="text"
        placeholder="Company Name"
        onChange={(e) => setCompany_name(e.target.value)}
        className="border"
        />
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Designation"
        onChange={(e) => setDesignation(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Skills"
        onChange={(e) => setSkills(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Experience"
        onChange={(e) => setExperience(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        className="border"
      />
      <input
        type="text"
        placeholder="Salary"
        onChange={(e) => setSalary(e.target.value)}
        className="border"
      />

      <button className="border" onClick={() => addJob()}>
        Add Job
      </button>
    </div>
    </> 
    );
}
 
export default AddJob;