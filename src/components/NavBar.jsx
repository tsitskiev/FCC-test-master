import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="main-nav">
      <nav role="navigation">
        <ul>
          <li>
            <NavLink to="/MarkdownPreviewer">MarkdownPreviewer</NavLink>
          </li>
          <li>
            <NavLink to="/DrumMachine">DrumMachine</NavLink>
          </li>
          <li>
            <NavLink to="/Calculator">Calculator</NavLink>
          </li>
          <li>
            <NavLink to="/25plusclock">25+5 Clock</NavLink>
          </li>
          <li>
            <NavLink to="/RandomQuoteMachine">QuoteMachine</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
