const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const audioSeparationRoutes = require("./routes/audioSeparationRoutes.jsx");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use("./input", express.static(path.join(__dirname, "input")));
app.use("/api/audio-separation", audioSeparationRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
