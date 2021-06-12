import React from 'react';
import classes from './Pagination.module.css';

const Pagination = ({ loading, currentPage, totalPages, handlePageChange }) => {
    
    const calcPageBoxes = () => {
        if (currentPage < 1) return [];
        let pageArray = [];
        const multiplier = Math.floor((currentPage - 1) / 3);
        const start = multiplier * 3 + 1;
        const end = (multiplier + 1) * 3 + 1;
        for (let i = start; i < end; i++) {
            if (i <= totalPages) pageArray.push(i);
        }
        return pageArray;
    };

    return <div className={classes.container}>
        {loading && 
            <div className={classes.cover}></div>
        }
        
        <div className={classes.box} onClick={() => handlePageChange(currentPage-1)}>ᐸ</div>
        
        {calcPageBoxes().map(p => 
            <div 
                key={p}
                className={[classes.box].concat(p === currentPage ? classes.active : '').join(' ')}
                onClick={() => handlePageChange(p)}
            > 
            {p}
            </div>)
        }
        <div className={classes.box} onClick={() => handlePageChange(currentPage+1)}>ᐳ</div>
        
    </div>
};

export default Pagination;