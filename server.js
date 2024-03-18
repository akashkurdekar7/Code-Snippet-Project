import express from "express";
import path from "path";
import mysql from "mysql";
import colors from "colors";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
    return;
  }
  console.log("Connected to MySQL database".bgBlack.bold.white);
});

// Handle database connection errors
connection.on("error", (err) => {
  console.error("Database error:", err);
});

// Close the database connection when the app exits
process.on("exit", () => {
  console.log("Closing MySQL connection...");
  connection.end();
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the TUF INTERN TASK</h1>`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgRed.bold.black);
});
