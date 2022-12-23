import React, { useState, useEffect } from 'react'
import '../App'
import { API_URL } from '../API'
import axios from 'axios'
import { useAppContext } from './context/appContext'

const BookList = () => {
  const [books, setBooks] = useState([])

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext()

  console.log('Os Favoritos:', favorites)

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id)

    return boolean
  }

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
              {favoritesChecker(book.id) ? (
                <button onClick={() => removeFromFavorites(book.id)}>Remover dos Favoritos</button>
              ) : (
                <button onClick={() => addToFavorites(book)}>Adicionar aos Favoritos</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookList
