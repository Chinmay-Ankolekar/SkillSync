import React, { useState } from "react";

const ShortlistCandidates = ({ token, jobId }) => {
  const [rankedResumes, setRankedResumes] = useState([]);

  const handleShortlistCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3000/rank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          requiredSkills: ["python"],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error("Empty response!");
      }

      setRankedResumes(data.rankedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadFiles = async () => {
    try {
      const response = await fetch(`http://localhost:3000/download/${jobId}`, {
        method: "GET",
      });

      console.log(response);
      if (response.ok) {
        console.log("Files downloaded and saved successfully.");
      } else {
        console.error("An error occurred while downloading files.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Shortlist Candidates</h2>

      <button onClick={handleShortlistCandidates}>Shortlist Candidates</button>
      <button onClick={handleDownloadFiles}>Download Files</button>
      {rankedResumes.length > 0 && (
        <div>
          <h3>Ranked Resumes:</h3>
          <ul>
            {rankedResumes.map((resume, index) => (
              <li key={index}>
                Name: {resume.fullname}, email: {resume.email}, Normalized
                Score: {resume.normalizedScore}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShortlistCandidates;
