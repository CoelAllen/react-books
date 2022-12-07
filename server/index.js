import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!@#qweWER234",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Backend Again");
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const sql = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  const values = [
    "title from backed",
    "desc from backend",
    "cover pice from backend",
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
