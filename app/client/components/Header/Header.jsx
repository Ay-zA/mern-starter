import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="app-header">
    <nav>
      <h1 className="app-header__title">MERN Stack</h1>
      <ul className="app-header__nav">
        <li className="app-header__nav-item">
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="app-header__nav-item">
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
