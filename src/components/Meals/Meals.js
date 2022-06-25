import MealList from './MealList';
import MealsSummary from './MealSummary';
import Card from '../UI/Card/Card';
import { DUMMY_MEALS } from '../../data/DummyMeals';

import classes from './Meals.module.css';

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <section className={classes.meals}>
        <Card>
          <MealList meals={DUMMY_MEALS} />
        </Card>
      </section>
    </>
  );
};

export default Meals;
