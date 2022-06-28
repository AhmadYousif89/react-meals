import MealList from './MealList';
import MealsSummary from './MealSummary';
import Card from '../UI/Card/Card';

import classes from './Meals.module.css';
import { useEffect, useState } from 'react';
import useHttpRequest from '../../hooks/useHttp';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const {
    error,
    isLoading,
    isSuccess,
    sendRequest: getMeals,
  } = useHttpRequest();

  const url = process.env.REACT_APP_MEALS_URL;

  useEffect(() => {
    getMeals(url, {}, meals => setMeals(meals));
  }, [getMeals, url]);

  let content = <h2>No meals on menu !</h2>;
  if (isLoading)
    content = <p style={{ fontSize: '2rem' }}>. . . Loading . . .</p>;
  if (isSuccess) content = <MealList meals={meals} />;
  if (error) content = <p style={{ fontSize: '2rem' }}>{error}</p>;

  return (
    <>
      <MealsSummary />
      <section className={classes.meals}>
        <Card>{content} </Card>
      </section>
    </>
  );
};

export default Meals;
