import classes from './Cart.module.css';
import Button from '../UI/Button/Button';
import CartList from './CartList';
import { useContext, useState } from 'react';
import CartContext from '../../store/Cart/cart-context';
import Checkout from './Checkout';
import useHttpRequest from '../../hooks/useHttp';
import Modal from '../UI/Modal/Modal';

const Cart = ({ onCartClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { meals, totalPrice, reset } = useContext(CartContext);
  const { isLoading, isSuccess, error, sendRequest } = useHttpRequest();

  const cartHasMeals = meals.length > 0;

  const sendOrderToDB = userData => {
    const orderInfo = { userInfo: userData, cartItems: meals };
    const url = process.env.REACT_APP_ORDERED_MEALS_URL;
    sendRequest(url, { method: 'POST', body: orderInfo });
    if (isSuccess) reset();
  };

  const cartContent = (
    <section className={classes['cart-items']}>
      <CartList addedMeals={meals} />
      <div className={classes.total}>
        <span>Total order price</span> <span>{totalPrice.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <Button onClick={onCartClose}>Close</Button>
        {cartHasMeals && (
          <Button onClick={() => setIsCheckout(true)}>Order</Button>
        )}
      </div>
    </section>
  );
  const checkoutContent = (
    <Checkout
      onClose={() => setIsCheckout(false)}
      onOrderConfim={sendOrderToDB}
    />
  );
  const errorContent = (
    <div className={classes.actions}>
      <h2>{error} ❗</h2>
      <Button onClick={onCartClose}>Close</Button>
    </div>
  );
  const successContent = (
    <div className={classes.actions}>
      <h2>Order sent successfully ✅</h2>
      <Button onClick={onCartClose}>Close</Button>
    </div>
  );

  return (
    <Modal onClick={onCartClose}>
      {!isCheckout && cartContent}
      {isSuccess && successContent}
      {error && errorContent}
      {isLoading && <h2>sending order 🔃</h2>}
      {isCheckout && !isSuccess && !error && !isLoading && checkoutContent}
    </Modal>
  );
};

export default Cart;
