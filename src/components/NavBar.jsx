import React from 'react'
import '../App'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <h1>
            <HomeIcon /> React Google Books Home
          </h1>
        </Link>
      </div>
      <div>
        <Link to="/favoritos">
          <h3>
            <FavoriteIcon /> Favoritos
          </h3>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
