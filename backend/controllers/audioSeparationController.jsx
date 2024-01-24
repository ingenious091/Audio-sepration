const asyncHandler = require("express-async-handler");
const path = require("path");
const { exec } = require("child_process");
const { stdout, stderr } = require("process");

const processAudio = asyncHandler((req, res) => {
  const { audio } = req.body;
  var localFileName = audio.substring(audio.lastIndexOf("/") + 1);
  var inputAudioPath = path.join(__dirname, "../input", localFileName);
  var outputAudioPath = path.join(__dirname, "../output");
  exec(`curl -o ${inputAudioPath} ${audio}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading file: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(`File downloaded!`, inputAudioPath);
      exec(
        `spleeter separate -p spleeter:2stems -o ${outputAudioPath} ${inputAudioPath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: "Internal server error" });
          }
          console.log(`Spleeter Output: ${stdout}`);
          console.log(`Spleeter Error: ${stderr}`);
          res.json({ message: "Separation completed" });
        }
      );
    }
  });
});

module.exports = { processAudio };
