import React from 'react';
import classes from './SummaryHeader.module.css';
import moment from 'moment';
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    rootSelect: {
        padding: '11px 10px',
        minWidth: '72px'
    }
}));

const SummaryHeader = ({selectedIndex, summaryTotals, handleSelectChange, entryData}) => {
    const muiClasses = useStyles();
    const { totalCalories, macros } = summaryTotals;

    return (
        <div className={classes.container}>
            <div className={classes.summary_head}>
                <p>{totalCalories.toLocaleString()} Calories</p>
                <FormControl variant='outlined'>
                    <InputLabel>Meal</InputLabel>
                    <Select
                        autoWidth={true}
                        classes={{root: muiClasses.rootSelect}}
                        label='Meal'
                        onChange={handleSelectChange}
                        value={selectedIndex}
                    >
                        <MenuItem value={-1}>All Meals</MenuItem>
                        {entryData.map((m, i) =>
                            <MenuItem value={i} key={i}>
                                {moment(m.time, 'HH:mm').format('h:mm a')}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.summary_body}>
                {Object.keys(macros).map(m =>
                    <div className={classes.percent_block} key={m}>
                        <p className={classes.name}>
                            {m}<span> ({macros[m].totalGrams}g)</span>
                        </p>
                        <div className={classes.percent}>{macros[m].percentage}%</div>
                        <div className={classes.bar_base}>
                            <div 
                            className={classes.bar_overlay}
                            style={{width: `${macros[m].percentage}%`}}
                            ></div>
                        </div>
                    </div>
                )}                
            </div>
        </div>
    )
};

export default SummaryHeader;