const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ RDS DB Connection
const db = mysql.createConnection({
  host: "yashdb.c7my02so0g4o.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Yashchaudhari98",
  database: "yashdb",
});

// ✅ Connection check
db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("Connected to RDS MySQL");
  }
});

// ✅ POST route to insert form data from React
app.post('/add-user', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Insert Error:', err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
