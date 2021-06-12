import React from 'react';
import moment from 'moment';
import classes from './Main.module.css';
import { CircularProgress } from '@material-ui/core';

const Main = ({loading, entries, handleAddEntry, handleEntryClick}) => {

    return <div className={classes.container}>
        <div 
            className={[classes.plus_circle].concat(loading ? classes.disabled : '').join(' ')} 
            onClick={handleAddEntry}>
        </div>
        <h1>Lastest Entries</h1>
        {loading 
            ? <div className={classes.loading_container}><CircularProgress color='secondary'/></div> 
            : <div className={classes.list_container}>
                {entries.map((e, i) => <div 
                    key={i}
                    className={classes.entry_box} 
                    onClick={() => handleEntryClick(e._id)}
                    >
                        {moment.parseZone(e.createdAt).format('dddd, MMMM Do')}
                </div>)}
            </div>
        }
    </div>
};

export default Main;