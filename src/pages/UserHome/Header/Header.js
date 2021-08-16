import React from 'react';
import classes from './Header.module.css';
import moment from 'moment';

const Header = () => {

    return <div className={classes.container}>
        <h1>Welcome Back</h1>
        <span>{moment().format('dddd, MMMM Do')}</span>
    </div>
};

export default Header;