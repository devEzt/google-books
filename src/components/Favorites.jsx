import React from 'react'
import '../App'
import { useAppContext } from './context/appContext'

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext()

  console.log('Os Favoritos:', favorites)

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id)

    return boolean
  }
  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites.map((book) => (
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
        ))
      ) : (
        <h1> Não foram adicionados favoritos ainda...</h1>
      )}
    </div>
  )
}

export default Favorites
