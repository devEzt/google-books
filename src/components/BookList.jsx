import React, { useState, useEffect } from 'react'
import '../App'
import { API_URL, myAPIkey } from '../services/API'
import axios from 'axios'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('java')

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext()

  const navigate = useNavigate()

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id)

    return boolean
  }

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setBooks(res.data.items)
      })
      .catch((err) => console.log(err))
  }, [])

  const searchBook = (evt) => {
    if (evt.key === 'Enter') {
      axios
        .get('https://www.googleapis.com/books/v1/volumes?q=' + search + myAPIkey)
        .then((res) => setBooks(res.data.items))
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}${myAPIkey}`)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result.items)
        // console.log(books);
      })
      .catch((error) => alert(error.message))
  }, [query])

  const getSearch = (e) => {
    e.preventDefault()

    if (search !== '') {
      setQuery(search)
      setSearch('')
    } else {
      alert('Enter Book Name!!')
    }
  }

  return (
    <div className="book-list">
      <form onSubmit={getSearch} className="search--form">
        <input
          type="text"
          placeholder="Search Book..."
          className="search--bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" className="search--btn">
          <img src="https://img.icons8.com/color/344/4a90e2/search--v1.png" alt="" />
        </button>
      </form>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div>
            <h4>{book.volumeInfo.title}</h4>
          </div>
          <div>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="imagem"
              onClick={() => navigate(`/livro/${book.id}`)}
            />
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
