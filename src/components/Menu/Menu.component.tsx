import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context/AppContext';

const Menu = () => {
  const { user } = useThemeContext();
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={`/home`}>
            <a className="navbar-brand">KeySafer</a>
          </Link> 
        </div>
      </nav>

    )
}

export default Menu;