import express from "express";
import colors from "colors";
import cors from "cors";
import query from "./db.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

app.post("/api/users/compile", async (req, res) => {
  try {
    const { code_language, source_code, stdin } = req.body;

    // Run the code with the provided language and input
    const output = await runCode(code_language, source_code, stdin);

    res.status(200).json({ output });
  } catch (error) {
    console.error("Compilation error:", error);
    res.status(500).json({ error: "Compilation failed" });
  }
});

app.use((err, req, res, next) => {
  console.log(colors.red("Error: " + err.message));
  res.status(err.status || 500).send({
    success: false,
    message: err.message || "Something Went Wrong",
  });
});

const PORT = 4000;
query("SELECT 1")
  .then((data) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.bgRed.bold.black);
    });
    console.log(`DB Connection Successfull`.bgRed.bold.black);
    console.log(data);
  })
  .catch((err) => console.error("db connection failed:", err));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the TUF INTERN TASK</h1>`);
});
