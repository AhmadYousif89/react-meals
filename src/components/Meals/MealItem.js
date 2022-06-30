import { useContext } from 'react';
import CartContext from '../../store/Cart/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ meal }) => {
  const { addMeal } = useContext(CartContext);

  const addToCart = amount => {
    const newMeal = {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: +amount,
    };
    addMeal(newMeal);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>$ {meal.price}</div>
      </div>
      <MealItemForm mealId={meal.id} onAddMeal={addToCart} />
    </li>
  );
};

export default MealItem;
