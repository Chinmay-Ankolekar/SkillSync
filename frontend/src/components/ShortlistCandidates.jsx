import React, { useEffect, useState } from "react";
import PythonQuiz from "./PythonQuiz";
import supabase from "../supabase/supabase";

const Shortlistresumes = ({ token, jobId }) => {
  const [rankedResumes, setRankedResumes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [userScores, setUserScores] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [skills, setSkills] = useState([]);
  const id = token.user.id;

  const handleDateChange = async (e) => {
    const date = e.target.value;

    setSelectedDate(date);

    try {
      const { error } = await supabase
        .from("test_end_date")
        .insert([{ job_id: jobId, end_date: date }]);

      if (error) {
        alert("End date for this job test already exists!");
        return;
      }

      alert(`End date for this job test is ${date} `);
    } catch (error) {
      console.error("Error inserting test_end_date:", error.message);
    }
  };

  //select all candidates
  // const fetchUserScoreByJobId = async () => {
  //   try {
  //     // Fetch user scores for the given job_id
  //     const { data: userScores, error: scoresError } = await supabase
  //       .from('user_scores')
  //       .select('*')
  //       .eq('job_id', jobId);

  //     if (scoresError) {
  //       console.error('Error fetching user scores:', scoresError.message);
  //       return [];
  //     }

  //     const userIds = userScores.map((score) => score.user_id);
  //     const { data: users, error: usersError } = await supabase
  //       .from('users')
  //       .select('*')
  //       .in('id', userIds);

  //     if (usersError) {
  //       console.error('Error fetching users:', usersError.message);
  //       return [];
  //     }

  //     // Combine user scores and user data
  //     const combinedData = userScores.map((score) => {
  //       const user = users.find((u) => u.id === score.user_id);
  //       return {
  //         user_id: score.user_id,
  //         job_id: score.job_id,
  //         score: score.score,
  //         user_name: user.fullname,
  //         user_email: user.email, // user data, if found
  //       };
  //     });

  //     setUserScores(combinedData);
  //     return combinedData;
  //   } catch (error) {
  //     console.error('Error fetching user scores:', error.message);
  //     return [];
  //   }
  // };

  //select single candidate with highest score
  const fetchUserScoreByJobId = async () => {
    try {
      const { data: userScores, error: scoresError } = await supabase
        .from("user_scores")
        .select("*")
        .eq("job_id", jobId);

      if (scoresError) {
        console.error("Error fetching user scores:", scoresError.message);
        return [];
      }

      if (userScores.length === 0) {
        alert("No candidates have taken the test yet");
        return;
      }

      userScores.sort((a, b) => b.score - a.score);

      const highestScoreUser = userScores[0];

      if (!highestScoreUser) {
        console.error("No user with the highest score found");
        return [];
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", highestScoreUser.user_id)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return [];
      }
      const combinedData = {
        user_id: highestScoreUser.user_id,
        job_id: highestScoreUser.job_id,
        score: highestScoreUser.score,
        user_name: user.fullname,
        user_email: user.email,
      };

      setUserScores([combinedData]);
      return [combinedData];
    } catch (error) {
      console.error("Error fetching user scores:", error.message);
      return [];
    }
  };

  const handleDownloadAndShortlist = async () => {
    try {
      const downloadResponse = await fetch(
        `http://localhost:3000/download/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!downloadResponse.ok) {
        throw new Error(
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
          requiredSkills: skills.split(",").map((skill) => skill.trim()), // Split skills string into an array
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendTestLink = async (user_id) => {
    alert("Sending test link");
    try {
      const response = await fetch(
        `http://localhost:3000/mail/${user_id}/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendOfferLetter = async (user_id) => {
    alert("Sending offer letter");
    try {
      const response = await fetch(
        `http://localhost:3000/offer/${user_id}/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("skills")
        .eq("id", jobId)
        .single();
      if (error) throw error;
      setSkills(data.skills);
      console.log(skills.split(",").map((skill) => skill.trim()));
    } catch (error) {
      console.error("Error fetching job skills:", error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={handleDownloadAndShortlist}
          className="m-2 mt-10 inline-flex items-center justify-center rounded-xl border border-transparent bg-purple-900 px-5 py-3 font-medium text-white hover:bg-purple-800"
        >
          Shortlist Resume
        </button>
        <button
          onClick={fetchUserScoreByJobId}
          className="m-2 mt-10 inline-flex items-center justify-center rounded-xl border-2 border-purple-900 transition  bg-white px-5 py-3 font-medium text-purple-900 hover:bg-purple-900 hover:text-white"
        >
          Get Test Score
        </button>
      </div>


      <div className="w-screen">
        <div className="mx-auto mt-8 max-w-screen-lg px-2">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row"></div>

          {rankedResumes.length > 0 && (
            <div>
              <div className="flex justify-center mt-10">
                <div className="w-full max-w-xs">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select a End Date for Test
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
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
                      {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Phone No
                      </td> */}
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        JobId
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Score
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        test link
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
                          {/* <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                            9999999999
                            <div className="flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-black lg:hidden">
                              9999999999
                            </div>
                          </td> */}
                          <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                            {jobId}
                            <div className="flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-black lg:hidden">
                              {jobId}
                            </div>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                            <div className="inline-flex items-center rounded-full py-2 px-3 text-xs text-black">
                              {resume.normalizedScore}
                            </div>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                            <button
                              onClick={() => sendTestLink(resume.id)}
                              className="inline-flex items-center rounded bg-purple-800 py-1 px-2 text-xs font-medium text-white hover:bg-purple-900"
                            >
                              Send
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userScores.length > 0 && (
            <div>
              <p className="mt-5 flex-1 text-base font-bold text-gray-900">
                Top Scores
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
                      {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Phone No
                      </td> */}
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        JobId
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Score
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Send Offer letter
                      </td>
                    </tr>
                  </thead>
                  <tbody className="lg:border-gray-300">
                    {userScores.map((userScore) => (
                      <tr key={userScore.user_id}>
                        <td
                          width="50%"
                          className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                        >
                          {userScore.user_name}
                          <div className="mt-1 lg:hidden">
                            <p className="font-normal text-gray-500">
                              {userScore.user_name}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {userScore.user_email}
                        </td>
                        {/* <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          9999999999
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-black lg:hidden">
                            9999999999
                          </div>
                        </td> */}
                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          {userScore.job_id}
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full py-2 px-3 text-left text-xs font-medium text-black lg:hidden">
                            {userScore.job_id}
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <div className="inline-flex items-center rounded-full py-2 px-3 text-xs text-black">
                            {userScore.score}
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <button
                            onClick={() => sendOfferLetter(userScore.user_id)}
                            className="inline-flex items-center rounded bg-purple-800 py-1 px-2 text-xs font-medium text-white hover:bg-purple-900"
                          >
                            Send
                          </button>
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
