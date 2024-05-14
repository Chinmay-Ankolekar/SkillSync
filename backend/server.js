const express = require("express");
const app = express();
const port = 3000;
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
require("dotenv").config();
const cors = require("cors");
const { log } = require("console");

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is required.");
}

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function downloadFilesAndCreateFolder(jobId) {
  try {
    const folderPath = path.join(__dirname, jobId);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const { data, error } = await supabase.storage
      .from("resumes")
      .list(`resumes/${jobId}`);

    // const { data: jobData, error: jobError } = await supabase
    // .from('jobs')
    // .select('*')
    // .eq('id', jobId);

    // console.log(jobData);

    // console.log(data);

    if (error) {
      throw error;
    }

    for (const file of data) {
      console.log("Downloading file:", file.name);

      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .download(`/resumes/${jobId}/${file.name}`);

      if (fileError) {
        throw fileError;
      }

      const buffer = Buffer.from(await fileData.arrayBuffer());

      fs.writeFileSync(path.join(folderPath, file.name), buffer);

      console.log("File downloaded and saved successfully:", file.name);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function extractTextFromPdf(pdfFile) {
  const dataBuffer = fs.readFileSync(pdfFile);
  const pdfText = await pdf(dataBuffer);
  return pdfText.text;
}

function extractSkillsFromText(text, requiredSkills) {
  const textLower = text.toLowerCase();
  return requiredSkills.filter((skill) =>
    textLower.includes(skill.toLowerCase())
  );
}

function calculateScore(resumeText, requiredSkills) {
  const resumeSkills = extractSkillsFromText(resumeText, requiredSkills);
  return resumeSkills.length;
}

async function rankResumes(resumes, requiredSkills) {
  const rankedResumes = [];
  let maxScore = 0;

  for (const resume of resumes) {
    const resumeText = await extractTextFromPdf(resume);
    const score = calculateScore(resumeText, requiredSkills);
    maxScore = Math.max(maxScore, score);
  }

  for (const resume of resumes) {
    const resumeText = await extractTextFromPdf(resume);
    const score = calculateScore(resumeText, requiredSkills);
    const normalizedScore = maxScore > 0 ? score / maxScore : 0;
    rankedResumes.push({ resume, normalizedScore });
  }

  rankedResumes.sort((a, b) => b.normalizedScore - a.normalizedScore);
  return rankedResumes;
}

function listPdfFiles(directory) {
  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".pdf"))
    .map((filename) => path.join(directory, filename));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/download/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    await downloadFilesAndCreateFolder(jobId);
    res.status(200).send("Files downloaded and saved successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred while downloading files.");
  }
});

app.post("/rank", async (req, res) => {
  try {
    const { jobId, requiredSkills } = req.body;
    const resumesDirectory = `./${jobId}`;
    const resumes = listPdfFiles(resumesDirectory);

    const rankedResumes = await rankResumes(resumes, requiredSkills);

    for (let i = 0; i < rankedResumes.length; i++) {
      const userId = rankedResumes[i].resume.match(/(\w+-\w+-\w+-\w+-\w+)/)[0];
      console.log(userId);
      const userData = await supabase
        .from('users')
        .select('email, fullname')
        .eq('id', userId)
        .single();

        console.log(userData);

      if (userData.error) {
        throw userData.error;
      }
      console.log(userData.data.email);

      rankedResumes[i].email = userData.data.email;
      rankedResumes[i].fullname = userData.data.fullname;
    }

    res.status(200).json({ rankedResumes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
