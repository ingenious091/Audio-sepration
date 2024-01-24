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


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production')  {
	app.use('/', express.static(path.join(__dirname1, '/frontend
}


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
