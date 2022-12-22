import React, { useState, useEffect } from 'react'
import '../App'
import { API_URL } from '../API'
import axios from 'axios'

const BookList = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data)
        setBooks(res.data.items)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div>
            <h4>{book.volumeInfo.title}</h4>
          </div>
          <div>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="imagem" />
            <div>
              <button>Adicionar aos Favoritos</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookList
