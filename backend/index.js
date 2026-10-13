const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());

const db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "testing",
});

db.getConnection((err, con) => {
  if (err) {
    console.log("DB not connected:", err.message);
  } else {
    console.log("DB connected Success !");
    con.release();
  }
});

app.get("/api/v1/test", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: "Something went wrong",
      });
    } else {
      res.json({
        students: ["Habib", "Ali", "Ahmad", "zaryab", "Rayan", "Rizwan"],
        Age: ["32", "33", "32", "34", "35", "36"],
        Dagree: ["BSSE", "BSCS", "BSSE", "BBA", "BSIT", "BBA"],
        products: results,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000 !");
});
