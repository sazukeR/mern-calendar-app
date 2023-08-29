const express = require("express");
const { dbConection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const app = express();

// DATABASE
dbConection();

// CORS
app.use(cors());

app.use(express.static("public"));

// MIDLEWARE BODY PARSE
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// LISTENER
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto  ${process.env.PORT}   `);
});
