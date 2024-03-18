import query from "../db.js";

export const createAndUpdateUserController = async (req, res) => {
  try {
    const { username, code_language, stdin, source_code } = req.body;
    const { id = 0 } = req.body;
    const rows = await query("CALL usp_code_snippet_add_or_edit(?,?,?,?,?)", [
      id,
      username,
      code_language,
      stdin,
      source_code,
    ]);
    res.status(200).send({
      success: true,
      message: "user created or updated successfully",
      rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create and update controller",
      error: error,
    });
  }
};

export const allUserController = async (req, res) => {
  try {
    const [rows, rowsCount] = await Promise.all([
      query("SELECT * FROM users.code_snippets"),
      query("SELECT COUNT(*) AS userCount FROM users.code_snippets"),
    ]);
    // if (rows.length === 0) {
    if (!rows) {
      res.status(404).send({
        message: "Not Found: no User Registered",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got all the user",
        success: true,
        rows,
        rowsCount,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in user controller",
      error: error,
    });
  }
};

export const singleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await query(`SELECT * FROM code_snippets WHERE id = ${id}`);
    if (!rows) {
      res.status(404).send({
        message: "Not Found: User does not exist",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got the single user",
        success: true,
        rows,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in single user controller",
      error: error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(`DELETE FROM code_snippets WHERE id = ${id}`);
    if (rows.affectedRows === 0) {
      res.status(404).send({
        message: `Not Found: User with id: ${id} does not exist `,
        success: false,
      });
    } else {
      res.status(200).send({
        message: `Deleted the user with id: ${id}`,
        success: true,
        rows,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in Delete user controller",
      error: error.message,
    });
  }
};
