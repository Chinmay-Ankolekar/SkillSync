import React, { useState } from "react";

const Shortlistresumes = ({ token, jobId }) => {
  const [rankedResumes, setRankedResumes] = useState([]);

  const handleDownloadAndShortlist = async () => {
    try {
      const downloadResponse = await fetch(
        `http://localhost:3000/download/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!downloadResponse.ok) {
        alert(
          `HTTP error during file download! Status: ${downloadResponse.status}`
        );
      }

      console.log("Files downloaded and saved successfully.");

      const shortlistResponse = await fetch("http://localhost:3000/rank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          requiredSkills: ["ganajsbwbvs"],
        }),
      });

      if (!shortlistResponse.ok) {
        throw new Error(
          `HTTP error during shortlisting! Status: ${shortlistResponse.status}`
        );
      }

      const shortlistData = await shortlistResponse.json();
      if (!shortlistData) {
        throw new Error("Empty response from shortlisting!");
      }

      setRankedResumes(shortlistData.rankedResumes);

      // if(shortlistData.rankedResumes.length === 0) {
      //   alert("No resumes shortlisted.");
      //   window.location.reload();
      // }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={handleDownloadAndShortlist}
          className="m-2 mt-10 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Shortlist resume
        </button>
      </div>

      <div className="w-screen">
        <div className="mx-auto mt-8 max-w-screen-lg px-2">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row"></div>

          {rankedResumes.length > 0 && (
            <div>
              <p className="flex-1 text-base font-bold text-gray-900">
                Shortlisted Candidates
              </p>
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
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Phone No
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Score
                      </td>
                    </tr>
                  </thead>
                  <tbody className="lg:border-gray-300">
                    {rankedResumes
                      .filter((resume) => resume.normalizedScore > 0)
                      .map((resume) => (
                        <tr key={resume.email}>
                          <td
                            width="50%"
                            className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                          >
                            {resume.fullname}
                            <div className="mt-1 lg:hidden">
                              <p className="font-normal text-gray-500">
                                {resume.email}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                            {resume.email}
                          </td>
                          <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                            9999999999
                            <div className="flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-black lg:hidden">
                              {resume.normalizedScore}
                            </div>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                            <div className="inline-flex items-center rounded-full py-2 px-3 text-xs text-black">
                              {resume.normalizedScore}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shortlistresumes;
