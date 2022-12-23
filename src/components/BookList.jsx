import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { Row, Col } from 'react-bootstrap'
import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import ReactPaginate from 'react-paginate'

import '../App'
import { API_URL, myAPIkey } from '../services/API'
import { useAppContext } from '../context/appContext'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('java')

  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

  const booksPerPage = 6
  const pagesVisited = pageNumber * booksPerPage

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext()

  const navigate = useNavigate()

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id)

    return boolean
  }

  const getBooks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(API_URL)
      setBooks(res.data.items)
    } catch (err) {
      throw new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
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
      alert('Procure o nome do livro!!')
    }
  }

  const displayBooks = books.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => {
    return (
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
    )
  })

  const pageCount = Math.ceil(books.length / booksPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return isLoading ? (
    <Grid
      container
      sx={{
        height: '100%',
        justifyContent: 'center',
        alignItems: { xs: 'start', mds: 'center' },
        display: 'flex',
      }}
    >
      <CircularProgress />
    </Grid>
  ) : (
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

        <div className="book-list">{displayBooks}</div>

        <Row className="styleRow">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
          />
        </Row>
      </div>
    </>
  )
}

export default BookList
