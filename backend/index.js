const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
    res.json({ success: true, data: results });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
