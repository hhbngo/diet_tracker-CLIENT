import React from 'react';
import { CircularProgress } from '@material-ui/core';
import classes from './Loading.module.css';

const Loading = ({variant, color}) => {

    return (
        <div 
            className={classes.container} 
            style={{
                backgroundColor: variant === 'opaque' ? 'white' : 'rgba(0, 0, 0, 0.4)'
            }}

        >
            <CircularProgress color={color} style={{marginTop: '-13%'}}/>
        </div>
    )
};

export default Loading;