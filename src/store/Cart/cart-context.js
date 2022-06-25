import { createContext } from 'react';

const CartContext = createContext({
  meals: [],
  totalPrice: 0,
  addMeal: meal => {},
  decreaseMeal: mealId => {},
  removeMeal: mealId => {},
});

export default CartContext;
