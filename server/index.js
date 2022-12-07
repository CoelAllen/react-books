import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!@#qweWER234",
  database: "test",
});

app.use(express.json());
app.use(cors());

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
  const sql = "INSERT INTO books(`title`, `desc`,'price', `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "DELETE FROM books WHERE id = ?";

  db.query(sql, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(sql, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been successfully updated");
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
