const express = require("express");
const app = express();
const port = 3000;
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const nodemailer = require('nodemailer');
require("dotenv").config();
const cors = require("cors");

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

      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .download(`/resumes/${jobId}/${file.name}`);

      if (fileError) {
        throw fileError;
      }

      const buffer = Buffer.from(await fileData.arrayBuffer());

      fs.writeFileSync(path.join(folderPath, file.name), buffer);


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
   
      const userData = await supabase
        .from('users')
        .select('email, fullname')
        .eq('id', userId)
        .single();


      if (userData.error) {
        throw userData.error;
      }


      rankedResumes[i].email = userData.data.email;
      rankedResumes[i].fullname = userData.data.fullname;
      rankedResumes[i].id = userId;
    }

    res.status(200).json({ rankedResumes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.pass 
    }
});

app.get('/mail/:id/:jobId', async (req, res) => {
  const { id, jobId } = req.params;
  const testLink = `http://localhost:5173/python?id=${id}&jobId=${jobId}`;

  const { data: jobData, error: jobError } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId);

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('email')
    .eq('id', id);


    const {data: jobTestDate, error: jobTestError} = await supabase
    .from('test_end_date')
    .select('end_date')
    .eq('job_id', jobId);


  let textMailOptions = {
    from: 'chinmaysankolekar@gmail.com',
    to: `${userData[0].email}`,
    subject: `Invitation for Job Test - Role: ${jobData[0].designation}`,
    text: `Dear Applicant,\n\nWe are pleased to invite you to take the job test for the role ${jobData[0].designation} as part of our hiring process. \n\nYou can access the test using the following link: ${testLink}\n\nThank you for your interest in joining our team. We look forward to your participation.\n\nBest regards,\n${jobData[0].company_name}
    
    Take test before : ${jobTestDate[0].end_date}
    `
};

  transporter.sendMail(textMailOptions, (err, data) => {
      if (err) {
          console.log('Error occurs for text email', err);
          res.status(500).send('Failed to send text email');
      } else {
          console.log('Text Email sent!!!');
      }
  });
});


app.get('/offer/:id/:jobId', async (req, res) => {
  const { id, jobId } = req.params;

  const { data: jobData, error: jobError } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId);

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('email, fullname')
    .eq('id', id);


    let offerLetterMailOptions = {
      from: 'chinmaysankolekar@gmail.com',
      to: `${userData[0].email}`,
      subject: `Job Offer - Role: ${jobData[0].designation}`,
      text: `Dear ${userData[0].fullname},
    
    Congratulations!
    
    We are delighted to offer you the position of ${jobData[0].designation} at ${jobData[0].company_name}. Your skills and experience are a great match for our team.
    
    We look forward to welcoming you to our company. Please let us know your acceptance of this offer by replying to us.
    
    Thank you for your interest in joining our team. If you have any questions, please do not hesitate to reach out.
    
    Best regards,
    ${jobData[0].company_name}`
    };
    

  transporter.sendMail(offerLetterMailOptions, (err, data) => {
      if (err) {
          console.log('Error occurs for text email', err);
          res.status(500).send('Failed to send text email');
      } else {
          console.log('Text Email sent!!!');
      }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
