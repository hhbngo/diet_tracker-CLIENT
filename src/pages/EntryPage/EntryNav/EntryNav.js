import React from 'react';
import classes from './EntryNav.module.css';
import PlusButton from '../../../components/PlusButton';
import { ReactComponent as ArrowSvg } from './assets/iconmonstr-arrow-64.svg';
import moment from 'moment';


const EntryNav = ({history, date, handleAddClick}) => {

    return <div className={classes.container}>
        <ArrowSvg 
            className={classes.arrow_svg}
            onClick={() => history.push('/')}
        />
        <p>
            {moment.parseZone(date).format('dddd, MMMM Do')}
        </p>
        <PlusButton 
            onClick={handleAddClick}
        />
    </div>
};

export default EntryNav;
