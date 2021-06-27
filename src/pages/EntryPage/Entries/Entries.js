import React from 'react';
import classes from './Entries.module.css';
import Meal from './Meal/Meal';

const Entries = ({entryData, handleEditClick, handleDeleteClick}) => {
    return (
        <div className={classes.container}>
            {entryData.map((m, i) => 
                <Meal 
                    key={i} 
                    date={m.time} 
                    foods={m.foods} 
                    totalCal={m.totalCalories} 
                    editClick={() => handleEditClick(i)}
                    deleteClick={() => handleDeleteClick(m._id)}
                />
            )}
        </div>
    )
}; 

export default Entries;
