import React, { useEffect, useState } from 'react'
import '../App'
import { useParams } from 'react-router-dom'
import { myAPIkey } from '../services/API'
import axios from 'axios'

const BookDetails = () => {
  const [book, setBook] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  // useEffect(() => {
  //   API.getBookDetail(id)
  //     .then((res) => {
  //       setBook(res.data)
  //     })
  //     .catch((err) => console.log(err))
  //   // axios
  //   //   .get(`https://www.googleapis.com/books/v1/volumes/${id}?${myAPIkey}`)
  //   //   .then((res) => {
  //   //     console.log(res.data, 'daysgone')

  //   //     setBook(res.data)
  //   //   })
  //   //   .catch((err) => console.log(err))
  // }, [id])

  const getBooks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?${myAPIkey}`)
      setBook(res.data)
    } catch (err) {
      throw new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoading ? (
    <div>Está carregando...</div>
  ) : (
    <div className="book-details">
      <div className="book-image">
        <h2>{book?.volumeInfo.title}</h2>
        <img src={book?.volumeInfo.imageLinks.thumbnail} alt="imagem" />
      </div>
      <div className="book-description">
        <h2>Descrição</h2>
        <p>{book?.volumeInfo.description !== undefined ? book.volumeInfo.description : ''}</p>
        <h2>Subtítulo</h2>
        <p>{book?.volumeInfo.subtitle}</p>
        <h2>Authors</h2>
        <p>{book?.volumeInfo.authors}</p>
        <h2>Páginas</h2>
        <p>{book?.volumeInfo.pageCount}</p>
      </div>
    </div>
  )
}

export default BookDetails
