import query from "./../config/db.js";

// Create new user
export const createUserController = async (req, res) => {
  try {
    const { username, code_language, stdin, source_code } = req.body;
    const data = await query(
      "INSERT INTO code_snippet (username, code_language, stdin, source_code) VALUES (?, ?, ?, ?)",
      [username, code_language, stdin, source_code]
    );
    res.status(200).send({
      success: true,
      message: "New user created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create user controller",
      error: error,
    });
  }
};

// Update existing user
export const updateUserController = async (req, res) => {
  try {
    const { username, code_language, stdin, source_code } = req.body;
    const { id } = req.params;
    const data = await query(
      "UPDATE code_snippet SET username = ?, code_language = ?, stdin = ?, source_code = ? WHERE id = ?",
      [username, code_language, stdin, source_code, id]
    );
    res.status(200).send({
      success: true,
      message: `User with id ${id} updated successfully`,
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in update user controller",
      error: error,
    });
  }
};

// Get all users Details
export const getAllUserController = async (req, res) => {
  try {
    const [data, dataCount] = await Promise.all([
      query("SELECT * FROM code_snippet"),
      query("SELECT COUNT(*) AS userCount FROM code_snippet"),
    ]);
    // if (data.length === 0) {
    if (!data) {
      res.status(404).send({
        message: "Not Found: no User Registered",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got all the user",
        success: true,
        data,
        dataCount,
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
// Get Single user Details
export const singleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await query(`SELECT * FROM code_snippet WHERE id = ${id}`);
    if (!data) {
      res.status(404).send({
        message: "Not Found: User does not exist",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got the single user",
        success: true,
        data,
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
// delete single user Details
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await query(`DELETE FROM code_snippet WHERE id = ${id}`);
    if (data.affecteddata === 0) {
      res.status(404).send({
        message: `Not Found: User with id: ${id} does not exist `,
        success: false,
      });
    } else {
      res.status(200).send({
        message: `Deleted the user with id: ${id}`,
        success: true,
        data,
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
