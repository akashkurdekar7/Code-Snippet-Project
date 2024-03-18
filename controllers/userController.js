import query from "../db.js";

export const userController = async (req, res) => {
  try {
    const rows = await query("SELECT * FROM users.code_snippets").catch((err) =>
      console.error(err)
    );
    res.send(rows);
  } catch (error) {
    res.status(500).send({
      success: true,
      message: "error in user controller",
      error: error,
    });
  }
};
