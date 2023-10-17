import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">

         <li>
            <NavLink to="/">HomePage</NavLink>
        </li>
        <li>
            <NavLink to="/people">All People</NavLink>
        </li>
        <li>
            <NavLink to="/newperson">Add Person</NavLink>
        </li>
    </ul>
};

export default NavLinks;