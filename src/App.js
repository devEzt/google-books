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
      <NavBar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/livros/:id" element={<BookDetails />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
