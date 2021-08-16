import React from 'react';
import classes from './TimePicker.module.css';

const TimePicker = ({time, onChange}) => {
    return <div className={classes.container}>
        <p>Time of meal</p>
        <form className={classes.wrapper}>
            <input 
                name='time' 
                type='time'
                value={time}
                onChange={onChange}
            />
        </form>
    </div>
};

export default TimePicker;

//moment().format('HH:mm') now 13:24