import { useEffect, useState } from "react";
import supabase from "../supabase/supabase";

const GetScore = ({ token }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const listFiles = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("resumes")
          .list(`resumes/8c819f43-4d38-4c70-8427-2acfb718027e`);

        if (error) {
          console.error("Error listing files:", error.message);
          return;
        }

        console.log(data);
        setFiles(data || []);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    listFiles();
  }, []);

  return (
    <div>
      <h2>Files in bucket for user </h2>
      {/* <ul>
        {files.map((file, idx) => (
          <li key={idx}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default GetScore;
