const asyncHandler = require("express-async-handler");
const path = require("path");
const { exec } = require("child_process");
const { stdout, stderr } = require("process");

const processAudio = asyncHandler((req, res) => {
  const { audio } = req.body;
  console.log(audio);
  var localFileName = audio.substring(audio.lastIndexOf("/") + 1);
  var inputAudioPath = path.join(__dirname, "../input", localFileName);
  var outputAudioPath = path.join(__dirname, "../output");
  exec(`curl -o ${inputAudioPath} ${audio}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading file: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(`File downloaded!`, inputAudioPath);

      // Use the 'cd' and '&&' to change directory and execute the command
      // const command = `cd /Users/ingenious && conda run -n myenv spleeter separate -p spleeter:2stems -o ${outputAudioPath} ${inputAudioPath}`;
      const command = `conda run -n myenv spleeter separate -p spleeter:2stems -o ${outputAudioPath} ${inputAudioPath}`;

      exec(command, (error, stdout, stderr) => {
        console.log("executing");
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }

        // Process the command output
        console.log(`Command output: ${stdout}`);

        // Check for errors in the command execution
        if (stderr) {
          console.error(`Command error: ${stderr}`);
        }
        return;
      });
    }
  });

  // res.send(200);
});

module.exports = { processAudio };
