import React, {useState} from 'react';
import classes from './Meal.module.css';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ReactComponent as TrashSvg } from './assets/iconmonstr-trash-can-16.svg';
import { ReactComponent as PencilSvg } from './assets/iconmonstr-pencil-6.svg';

const Meal = ({date, foods, totalCal, editClick, deleteClick}) => {
    const [expanded, setExpaned] = useState(false);
    const [keyframe, setKeyframe] = useState(null);

    const handleClick = () => {
        setKeyframe(expanded ? 'close' : 'open');
        setExpaned(prev => !prev);
    }

    return <div className={classes.container}>
        <div className={classes.head} onClick={handleClick}>
            <p>{moment(date, 'HH:mm').format('h:mm A')}</p>
            <span>{totalCal} calories</span>
            <ExpandMoreIcon className={`${keyframe ? classes[keyframe] : ''}`}/>
        </div>
        <div className={`${classes.content} ${expanded ? classes.expanded : ''}`}>
            <div className={classes.divider}></div>
            <div className={classes.box}>
                {foods.map((f, i) => 
                    <div key={i} className={classes.food_container}>
                        <p className={classes.food_title}>{f.name}</p>
                        <div className={classes.weight}>{f.weight}g</div>
                        <div className={classes.macros}>
                            <p>C: {f.carb}g</p>
                            <p>F: {f.fat}g</p>
                            <p>P: {f.protein}g</p>
                        </div>
                    </div>    
                )}
                <div className={classes.chip}>
                    <PencilSvg onClick={editClick}/>
                    <TrashSvg onClick={deleteClick}/>
                </div>
            </div>
        </div>
    </div>
};

export default Meal;
