import React from 'react';
import Navlink from './navLink';
import { FaGithubAlt, FaSlack, FaTwitter } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  return (
    <div>
      <nav id="scotchy-nav" className="navbar is-dark">
        <div className="navbar-item">
          <Navlink activeClassName="active" to="/home">
            Decagon
          </Navlink>
        </div>
        <ul>
          <Navlink
            activeClassName="active"
            id="home"
            to="/dashboard"
            text="Dashboard"
          />
          <Navlink
            activeClassName="active"
            id=""
            to="/drivers"
            text="Drivers"
          />
          <Navlink
            activeClassName="active"
            id="github-icon"
            to="https://www.github.com"
            target="_blank"
            text={<FaGithubAlt />}
          />
          <Navlink
            activeClassName="active"
            id="slack-icon"
            to="https://www.slack.com"
            target="_blank"
            text={<FaSlack />}
          />
          <Navlink
            activeClassName="active"
            id="twitter-icon"
            to="https://www.twitter.com"
            target="_blank"
            text={<FaTwitter />}
          />
        </ul>
      </nav>
    </div>
  );
}
