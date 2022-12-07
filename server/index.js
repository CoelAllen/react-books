import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!@#qweWER234",
  database: "test",
});

app.use(express.json());

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
  const values = [req.body.title, req.body.title, req.body.cover];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
