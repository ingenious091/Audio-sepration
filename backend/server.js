const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const audioSeparationRoutes = require("./routes/audioSeparationRoutes.jsx");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = 5001;
app.use("./input", express.static(path.join(__dirname, "input")));
app.use("/api/audio-separation", audioSeparationRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
const NODE_ENV = "production";
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
