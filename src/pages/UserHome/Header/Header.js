import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Header = () => {

    return <div className={classes.container}>
        <h1>Welcome Back,</h1>
        <Link to='/stats'>Diet stats →</Link>
        <Link to='/weight-history'>Weight history →</Link>
        <span>{moment().format('dddd, MMMM Do')}</span>
    </div>
};

export default Header;