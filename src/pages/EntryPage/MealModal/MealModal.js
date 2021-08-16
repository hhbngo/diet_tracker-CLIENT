import React, { useEffect, useRef } from 'react';
import classes from './MealModal.module.css';
import TimePicker from '../../../components/TimePicker/TimePicker';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { getFoodData } from '../../../functions/entryPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nameField: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: 130,
  },
  macroField: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: 80,
  },
}));

const MealModal = ({
  mState,
  show,
  mode,
  onCancel,
  handleSaveSubmit,
  dispatch,
}) => {
  const muiClasses = useStyles();
  const inputBlockRef = useRef();

  const {
    foods,
    totalCalories,
    time,
    inputs,
    inputting,
    manual,
    invalidFields,
    loading,
  } = mState;

  useEffect(() => {
    if (!inputting) return;
    inputBlockRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [inputting, manual]);

  const handleStateChange = (key, value) =>
    dispatch({ type: 'STATE_CHANGE', payload: { key, value } });

  const handleAddFood = (foodData) => {
    const { carb, fat, protein, ...rest } = foodData;
    const calories = (carb + protein) * 4 + fat * 9;
    dispatch({
      type: 'SET_FOOD',
      payload: {
        foods: foods.concat({
          ...rest,
          carb,
          fat,
          protein,
          calories,
        }),
        totalCalories: totalCalories + calories,
      },
    });
  };

  const handleTimeChange = (e) => handleStateChange('time', e.target.value);

  const handleAddClick = () => {
    handleStateChange('inputting', true);
  };

  const handleManualMode = () => {
    handleStateChange('manual', !manual);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    const payload = { ...inputs, [name]: value };
    dispatch({ type: 'INPUT_CHANGE', payload });
    handleStateChange('invalidFields', { ...invalidFields, [name]: false });
  };

  const handleFoodSubmit = () => {
    const { name, ...rest } = inputs;
    const macroArr = Object.keys(rest).map((n) => parseInt(inputs[n]));
    const invalidName = name === !name || name.length === 0;
    const invalidWeight = !manual && !macroArr[0];
    const invalidMacros = manual && macroArr.some((el) => !el);

    if (invalidName || invalidWeight || invalidMacros) {
      const { name, weight, ...rest } = invalidFields;
      if (manual) {
        rest.c = !macroArr[1];
        rest.f = !macroArr[2];
        rest.p = !macroArr[3];
      }
      return handleStateChange('invalidFields', {
        name: invalidName,
        weight: !macroArr[0],
        ...rest,
      });
    }

    const [weight, carb, fat, protein] = macroArr;

    if (manual) {
      handleAddFood({ name, weight, carb, fat, protein });
    } else {
      handleStateChange('loading', true);
      getFoodData({ foodName: name, foodWeight: weight })
        .then((res) => {
          handleAddFood({ name, weight, ...res.data });
        })
        .catch((err) => {
          handleStateChange('loading', false);
          handleStateChange('invalidFields', {
            ...invalidFields,
            name: true,
          });
        });
    }
  };

  const handleFoodRemove = (index) => {
    const newFoodArr = foods.filter((e, i) => i !== index);
    dispatch({
      type: 'SET_FOOD',
      payload: {
        foods: newFoodArr,
        totalCalories: totalCalories - foods[index].calories,
      },
    });
  };

  return (
    <div className={`${classes.container} ${show ? classes.show : ''}`}>
      <h1>{mode} Meal</h1>
      <TimePicker time={time} onChange={handleTimeChange} />
      <div className={classes.foodList}>
        <div>
          {foods.map((f, i) => {
            return (
              <div key={i} className={classes.label}>
                <div className={classes.label_name}>{f.name}</div>
                <div className={classes.label_weight}>{f.weight} g</div>
                <span onClick={() => handleFoodRemove(i)}>x</span>
              </div>
            );
          })}
        </div>
        <form
          className={`${muiClasses.root} ${inputting ? classes.s : classes.n}`}
          ref={inputBlockRef}
          onChange={handleInputChange}
        >
          <TextField
            className={muiClasses.nameField}
            error={invalidFields.name}
            name="name"
            label={invalidFields.name ? 'Invalid food' : 'Food Name'}
            value={inputs.name}
          />
          <TextField
            className={muiClasses.macroField}
            error={invalidFields.weight}
            type="number"
            name="weight"
            label="Weight (g)"
            value={inputs.weight}
          />
          <div style={{ display: manual ? 'block' : 'none' }}>
            <TextField
              className={muiClasses.macroField}
              error={invalidFields.c}
              type="number"
              name="c"
              label="Carbs (g)"
              value={inputs.c}
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <TextField
              className={muiClasses.macroField}
              error={invalidFields.f}
              type="number"
              name="f"
              label="Fat (g)"
              value={inputs.f}
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <TextField
              className={muiClasses.macroField}
              error={invalidFields.p}
              type="number"
              name="p"
              label="Protein (g)"
              value={inputs.p}
              inputProps={{ style: { textAlign: 'right' } }}
            />
          </div>
          <div className={classes.form_btn_container}>
            <button
              type="button"
              className={`${classes.g_btn} ${
                loading ? classes.g_disabled : ''
              }`}
              onClick={handleFoodSubmit}
            >
              {loading ? 'Loading...' : 'Add +'}
            </button>
            <button
              type="button"
              className={`${classes.g_btn} ${loading ? classes.g_hidden : ''}`}
              style={{ fontWeight: manual ? 'bold' : 'unset' }}
              onClick={handleManualMode}
            >
              {manual ? 'Cancel' : 'Manual +'}
            </button>
          </div>
        </form>
      </div>
      <div className={classes.add_btn}>
        {inputting ? (
          <div style={{ height: '34px' }}></div>
        ) : (
          <button onClick={handleAddClick}>Add Food +</button>
        )}
      </div>
      <div className={classes.end_btn}>
        <button type="button" className={classes.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className={`${
            foods.length === 0 ? classes.save_disabled : classes.save
          }`}
          onClick={handleSaveSubmit}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default MealModal;
