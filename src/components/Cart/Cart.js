import classes from './Cart.module.css';
import Button from '../UI/Button/Button';
import CartList from './CartList';
import { useContext } from 'react';
import CartContext from '../../store/Cart/cart-context';

const Cart = ({ onCartClose }) => {
  const { meals, totalPrice } = useContext(CartContext);

  const cartHasMeals = meals.length > 0;

  return (
    <section className={classes['cart-items']}>
      <CartList addedMeals={meals} />
      <div className={classes.total}>
        <span>Total order price</span> <span>{totalPrice.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <Button onClick={onCartClose}>Close</Button>
        {cartHasMeals && (
          <Button
            onClick={() => {
              console.log('Ordering');
            }}>
            Order
          </Button>
        )}
      </div>
    </section>
  );
};

export default Cart;
