import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Coel's Book Shop</h1>
      <div className="books">
        {books.map(({ id, cover, title, desc, price }) => (
          <div className="book" key={id}>
            {cover && <img src={cover} alt="" />}
            <h2>{title}</h2>
            <p>{desc}</p>
            <span>{price}</span>
            <button className="delete" onClick={() => handleDelete(id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={"/add"}>Add new book</Link>
      </button>
    </div>
  );
}

export default Books;
