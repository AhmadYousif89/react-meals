import CartItem from './CartItem';

const CartList = ({ addedMeals }) => {
  return (
    <ul>
      {addedMeals.map(meal => (
        <CartItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default CartList;
