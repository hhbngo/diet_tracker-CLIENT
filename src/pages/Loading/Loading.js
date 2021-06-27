import React from 'react';
import { CircularProgress } from '@material-ui/core';
import classes from './Loading.module.css';

const Loading = ({variant, color, height}) => {

    return (
        <div 
            className={classes.container} 
            style={{
                backgroundColor: variant === 'opaque' ? 'white' : 'rgba(0, 0, 0, 0.4)',
                height: height ? height : 'unset'
            }}

        >
            <CircularProgress color={color}/>
        </div>
    )
};

export default Loading;