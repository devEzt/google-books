import React, { useState, useEffect } from 'react'
import '../App'
import { API_URL, myAPIkey } from '../services/API'
import axios from 'axios'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { Row, Col } from 'react-bootstrap'
import { Button, Pagination, TextField } from '@mui/material'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('java')

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)

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

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}${myAPIkey}`)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result.items)
      })
      .catch((error) => alert(error.message))
  }, [query])

  const getSearch = (e) => {
    e.preventDefault()

    if (search !== '') {
      setQuery(search)
      setSearch('')
    } else {
      alert('Procure um nome de livro!!')
    }
  }

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = books.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      <div>
        <Row className="styleRow">
          <Col xs={12}>
            <form onSubmit={getSearch} className="styleForm">
              <TextField
                id="outlined-basic"
                type="text"
                placeholder="Procurar Livros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                className="styleForm-form"
              />
              <div className="styleForm">
                <Button className="styleForm-button" type="submit" variant="contained" endIcon={<SearchIcon />}>
                  Buscar
                </Button>
              </div>
            </form>
          </Col>
        </Row>

        <div className="book-list">
          {currentPosts.map((book) => (
            <div key={book?.id} className="book-card">
              <div>
                <h4>{book?.volumeInfo?.title}</h4>
              </div>
              <div>
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt="imagem"
                  onClick={() => navigate(`/livro/${book.id}`)}
                />
                <div>
                  {favoritesChecker(book.id) ? (
                    <button className="button-card" onClick={() => removeFromFavorites(book.id)}>
                      Remover dos Favoritos
                    </button>
                  ) : (
                    <button className="button-card" onClick={() => addToFavorites(book)}>
                      Adicionar aos Favoritos
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Row className="styleRow">
          <Col xs={12}>
            <Pagination
              totalPosts={books.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default BookList
