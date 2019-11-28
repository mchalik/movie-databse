import React from 'react';
import './style.css';

const Header = ({text}) => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
