import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { user } = useThemeContext();
  const navigate = useNavigate();
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate('/home')}>KEYSAFER</a>
            {user && <a className="navbar-brand" onClick={() => navigate(-1)}>Atrás</a>}
        </div>
      </nav>

    )
}

export default Menu;