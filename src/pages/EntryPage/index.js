import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import classes from './index.module.css';
import { CircularProgress } from '@material-ui/core';
import Modal from '../../components/Modal/Modal';
import MealModal from './MealModal/MealModal';
import EntryNav from './EntryNav/EntryNav';
import SummaryHeader from './SummaryHeader/SummaryHeader';
import Entries from './Entries/Entries';
import {sumMealData, getEntry, createMeal, editMeal, deleteMeal } from '../../functions/entryPage';
import moment from 'moment';

const initialModalData = () => ({
    foods: [],
    totalCalories: 0,
    time: moment().format('HH:mm'),
    inputs: {
        name: '',
        weight: '',
        c: '',
        f: '',
        p: ''
    },
    inputting: false,
    manual: false,
    error: false,
    invalidFields: {
        name: false,
        weight: false,
        c: false, 
        f: false,
        p: false
    },
    loading: false
});

const modalReducer = (state, action) => {   
    switch (action.type) {
        case 'RESET': return initialModalData();
        case 'FORM_RESET': {
            let { foods, totalCalories, time } = state;
            return {...initialModalData(), foods, totalCalories, time};
        }
        case 'STATE_CHANGE': return {...state, [action.payload.key]: action.payload.value}
        case 'INPUT_CHANGE': return {...state, inputs: action.payload}
        case 'SET_FOOD': {
            let { foods, totalCalories } = action.payload;
            return {...initialModalData(), foods, totalCalories, time: state.time };
        }
        case 'EDIT_MODE' : return {...initialModalData(), ...action.payload}
        default: return state;
    }
};

export default function EntryPage({history, match}) {
    const [loading, setLoading] = useState(true);
    const [modalState, dispatch] = useReducer(modalReducer, initialModalData());
    const [show, setShow] = useState(false);
    const [entryData, setEntryData] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [summaryTotals, setSummaryTotals] = useState(null);
    const [memoizedSummaries, setMemoizedSummaries] = useState({});
    const [mealID, setMealID] = useState(null);
    const reduxDispatch = useDispatch();

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getEntry(match.params.id)
        .then(res => {
            const {_id, updatedAt, __v, ...rest} = res.data;
            const calculatedSummary = sumMealData(rest.meals);
            setSummaryTotals(calculatedSummary);
            setMemoizedSummaries({});
            setSelectedIndex(-1);
            setEntryData(rest);
            setLoading(false);
        })
        .catch(err => {
            reduxDispatch({type: 'AUTH_FALSE'});
        })
    };

    const handleModalClose = () => {
        setShow(false);
        mealID 
            ? dispatch({type: 'RESET'})
            : dispatch({type: 'FORM_RESET'});
        setMealID(null);
    }; 
    
    const handleSelectChange = e => {
        const index = e.target.value;
        setSelectedIndex(index);
        if (index in memoizedSummaries) {
            return setSummaryTotals(memoizedSummaries[index]);        
        }
        const summary = sumMealData(
            index === -1 
            ? entryData.meals
            : [entryData.meals[index]]
        );
        setSummaryTotals(summary);
        setMemoizedSummaries(prev => ({...prev, [index]: summary}));  
    };

    const handleAddClick = () => {
        setMealID(null);
        setShow(true);
    };
    
    const handleEditClick = (index) => {
        const {_id, ...rest} = entryData.meals[index]; 
        dispatch({type: 'EDIT_MODE', payload: rest});
        setMealID(_id);
        setShow(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Delete this meal?')) {
            setLoading(true);
            deleteMeal(id)
            .then(res => {
                refresh();
            })
            .catch(err => {
                refresh();
            })
        }
    };

    const handleSaveSubmit = async () => {
        try {
            if (!show) return;
            const entryId = match.params.id;
            const { foods, time, totalCalories } = modalState;
            if (foods.length === 0) return;
            const mealData = {foods, time, totalCalories};
            setLoading(true);
            setShow(false);
            dispatch({type: 'RESET'});
            if (mealID) {
                await editMeal(mealData, mealID);
                refresh();
            } else {
                await createMeal(mealData, entryId);
                refresh();
            }
        } catch(err) {
            refresh();
        } 
    };

    return <main className={classes.container}>
        {loading ? 
            <div className={classes.loading_container}>
                <CircularProgress color='secondary'/>
            </div> : 
            <>
                <Modal show={show} onClose={handleModalClose}>
                    <MealModal
                        show={show}
                        mState={modalState}
                        dispatch={dispatch}
                        mode={mealID ? 'Edit' : 'Add'}
                        handleSaveSubmit={handleSaveSubmit}
                        onCancel={handleModalClose}
                    />
                </Modal>
                <EntryNav 
                    history={history}
                    date={entryData.createdAt}
                    handleAddClick={handleAddClick}
                />
                <div className={classes.wrapper}>
                    {entryData.meals.length === 0 
                        ? <div className={classes.no_entries}>(No meals created yet!)</div>
                        : <> 
                            <SummaryHeader
                                selectedIndex={selectedIndex}
                                summaryTotals={summaryTotals}
                                handleSelectChange={handleSelectChange} 
                                entryData={entryData.meals}
                            />
                            <Entries
                                entryData={entryData.meals}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                        </>
                    }  
                </div>
            </>
        }
    </main>
};


// redux save last page 


//labels 1
// delete label 1
// save/cancel buttons 1
// save handler  1
// useEffect / refresh 1
// delete meal 1