import { useContext, useLayoutEffect, useState } from 'react';
import CartContext from '../../store/Cart/cart-context';
import { CartIcon } from '../Cart/CartIcon';
import Button from '../UI/Button/Button';
import classes from './Header.module.css';
import mealImg from './assets/meals.png';

const Header = ({ onCartOpen }) => {
  const [bumpClass, setBumpClass] = useState(false);
  const { meals } = useContext(CartContext);

  const totalAmount = meals.reduce(
    (totalAmount, meal) => totalAmount + meal.amount,
    0,
  );

  useLayoutEffect(() => {
    if (meals.length > 0) setBumpClass(true);

    const timer = setTimeout(() => setBumpClass(false), 300);

    return () => clearTimeout(timer);
  }, [meals]);

  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <Button
          className={`${bumpClass ? classes.bump : ''}`}
          onClick={onCartOpen}>
          <span className={classes.icon}>{<CartIcon />}</span>
          <span>Cart</span>
          <span className={classes.badge}>{totalAmount}</span>
        </Button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealImg} alt='meals' />
      </div>
    </>
  );
};

export default Header;
