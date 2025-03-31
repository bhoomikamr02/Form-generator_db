const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "form_generator",
  password: process.env.DB_PASS || "MYSQL123",
  port: process.env.DB_PORT || 5432,
});

app.use(express.json());

// Get all form entries
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employee");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert new form entry
app.post("/employees", async (req, res) => {
  try {
    const { form_title, form_layout, field_name, field_type, column_span, is_required, options } = req.body;
    const query = `INSERT INTO employee (form_title, form_layout, field_name, field_type, column_span, is_required, options) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [form_title, form_layout, field_name, field_type, column_span, is_required, options];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an employee entry
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM employee WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
