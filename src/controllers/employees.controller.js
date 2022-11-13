import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("Select * from employee");
    res.json(rows);
  } catch (err) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("Select * from employee where id=?", [
      req.params.id,
    ]);
    console.log(rows);
    if (rows.length <= 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee(name,salary) VALUES(?,?)",
      [name, salary]
    );

    res.send({ id: rows.insertId, name: name, salary: salary });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const putEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee set name= IFNULL(?,name),salary=IFNULL(?,salary) where id=?",
      [name, salary, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });
    const [rows] = await pool.query("Select * from employee where id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("Delete from employee where id=?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
