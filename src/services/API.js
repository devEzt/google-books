/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
export const API_URL =
  'https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyC3IEghsG4m5EG2kqPeh8_VgRQOc_lJkfA'

export const myAPIkey = '&key=AIzaSyC3IEghsG4m5EG2kqPeh8_VgRQOc_lJkfA'
const booksUrl = 'https://www.googleapis.com/books/v1/volumes?q='

export const BOOK_DETAILS_URL = 'https://www.googleapis.com/books/v1/volumes/'

export default {
  // Gets the books with the given search text
  getBookDetail: function (id) {
    return axios.get(`${BOOK_DETAILS_URL}${id}?${myAPIkey}`)
  },
}
