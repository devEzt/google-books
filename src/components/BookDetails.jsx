import React, { useEffect, useState } from 'react'
import '../App'
import { useParams } from 'react-router-dom'
import API, { BOOK_DETAILS_URL, myAPIkey } from '../API'
import axios from 'axios'

const BookDetails = () => {
  const [book, setBook] = useState({})
  console.log({ book }, 'teste')

  const { id } = useParams()

  console.log({ id })
  console.log({ myAPIkey })

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

  async function fetchData() {
    let response = await API.getBookDetail(id)

    let book = await response.data
    setBook(book)
    console.log(book)
  }

  useEffect(() => {
    fetchData()
  })

  return (
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
