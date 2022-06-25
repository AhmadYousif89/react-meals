import MealItem from './MealItem';

const MealList = ({ meals }) => {
  return (
    <ul>
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealList;
