import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/books");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Coel's Book Shop</h1>
      <div className="books">
        {books.map(({ cover, title, desc, price }) => (
          <div className="book">
            {cover && <img src={cover} alt="" />}
            <h2>{title}</h2>
            <p>{desc}</p>
            <span>{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
