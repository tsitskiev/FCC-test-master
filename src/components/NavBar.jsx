import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="main-nav">
      <nav role="navigation">
        <ul>
          <li>
            <NavLink to="/MarkdownPreviewer">Markdown-Previewer</NavLink>
          </li>
          <li>
            <NavLink to="/DrumMachine">Drum-Machine</NavLink>
          </li>
          <li>
            <NavLink to="/Calculator">Calculator</NavLink>
          </li>
          <li>
            <NavLink to="/25plusclock">25+5 Clock</NavLink>
          </li>
          <li>
            <NavLink to="/RandomQuoteMachine">Quote-Machine</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
