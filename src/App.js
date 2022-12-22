import './App.css'
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetails from './components/BookDetails'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Favorites from './components/Favorites'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
