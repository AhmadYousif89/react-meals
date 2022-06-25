import { useContext } from 'react';
import CartContext from '../../store/Cart/cart-context';
import Button from '../UI/Button/Button';
import classes from './CartItem.module.css';

const CartItem = ({ meal }) => {
  const { addMeal, removeMeal, decreaseMeal } = useContext(CartContext);

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{meal.name}</h2>
        <div className={classes.summary}>
          <p className={classes.price}>{meal.price.toFixed(2)}</p>
          <p className={classes.amount}>x {meal.amount}</p>
        </div>
      </div>
      <div className={classes.actions}>
        <Button onClick={() => decreaseMeal(meal.id)}>-</Button>
        <Button onClick={() => addMeal({ ...meal, amount: 1 })}>+</Button>
        <Button
          onClick={() => removeMeal(meal.id)}
          style={{ transform: 'translate(50%, 0)' }}>
          x
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
