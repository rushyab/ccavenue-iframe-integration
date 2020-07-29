const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/ccavenue", require("./ccavenueApis"));

app.listen(PORT, () => console.log(`\n\nApp is running on port ${PORT}\n\n`));
