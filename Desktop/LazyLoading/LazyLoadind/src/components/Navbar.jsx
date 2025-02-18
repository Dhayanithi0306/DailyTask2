// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
        <li><Link to="/page3">Page 3</Link></li>
        <li><Link to="/page4">Page 4</Link></li>
        <li><Link to="/page5">Page 5</Link></li>
        <li><Link to="/page6">Page 6</Link></li>
        <li><Link to="/page7">Page 7</Link></li>
        <li><Link to="/page8">Page 8</Link></li>
        <li><Link to="/page9">Page 9</Link></li>
        <li><Link to="/page10">Page 10</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
