import axios from 'axios';

const reduce = (arr, key) => arr.reduce((a, b) => a + b[key], 0);

export const sumMealData = (arr) => {
  let totalCalories = 0;
  let totalCarb = 0;
  let totalProtein = 0;

  arr.forEach((meal) => {
    const current = meal.foods;
    totalCalories += meal.totalCalories;
    totalCarb += reduce(current, 'carb');
    totalProtein += reduce(current, 'protein');
  });

  const toPercentMultipier = 400 / totalCalories;
  const carbPercentage = Math.ceil(totalCarb * toPercentMultipier);
  const proteinPercentage = Math.ceil(totalProtein * toPercentMultipier);
  const fatPercentage = 100 - carbPercentage - proteinPercentage;

  return {
    totalCalories,
    macros: {
      carbohydrates: {
        totalGrams: Math.ceil(totalCarb),
        percentage: carbPercentage,
      },
      fats: {
        totalGrams: Math.floor((totalCalories * fatPercentage) / 100 / 9),
        percentage: fatPercentage,
      },
      protein: {
        totalGrams: Math.ceil(totalProtein),
        percentage: proteinPercentage,
      },
    },
  };
};

export const getEntry = (entryId) =>
  axios.get(`${process.env.REACT_APP_API}/entrie/get-entry/${entryId}`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

export const getFoodData = (foodItem) =>
  axios.post(`${process.env.REACT_APP_API}/entrie/check-food`, foodItem);

export const createMeal = (mealData, entryId) =>
  axios.put(
    `${process.env.REACT_APP_API}/entrie/create-meal/${entryId}`,
    mealData,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }
  );

export const editMeal = (mealData, mealId) =>
  axios.patch(
    `${process.env.REACT_APP_API}/entrie/update-meal/${mealId}`,
    mealData,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }
  );

export const deleteMeal = (mealId) =>
  axios.delete(`${process.env.REACT_APP_API}/entrie/delete-meal/${mealId}`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

export const deleteEntry = (entryId) =>
  axios.delete(`${process.env.REACT_APP_API}/entrie/delete-entrie/${entryId}`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
