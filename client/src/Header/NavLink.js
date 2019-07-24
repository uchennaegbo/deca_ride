import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navlink(props) {
  return (
    <>
      <li id={props.id}>
        <NavLink to={props.to} className={props.class}>
          {' '}
          {props.text}{' '}
        </NavLink>
      </li>
    </>
  );
}
