import React from 'react';
import classes from './index.module.css';

export default function PlusButton({onClick}) {
    return <div className={classes.plus_circle} onClick={onClick}></div>
};