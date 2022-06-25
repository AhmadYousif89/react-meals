import { useReducer } from 'react';
import CartContext from './cart-context';

const cartState = {
  meals: [],
  totalPrice: 0,
};
const CART_TYPE = {
  add: 'ADD_MEAL',
  decrease: 'DECREASE_MEAL',
  remove: 'REMOVE_MEAL',
};

const cartReducer = (state, action) => {
  let existingMealIndex;
  let existingMeal;
  let updatedMeals;
  let totalMealPrice;
  if (action.type === CART_TYPE.add) {
    // expecting meal object
    // if meal exist then add new meal and adjust amount and total price
    // if meal does not exist then add it to cart
    existingMealIndex = state.meals.findIndex(
      meal => meal.id === action.meal.id,
    );
    existingMeal = state.meals[existingMealIndex];
    totalMealPrice = state.totalPrice + action.meal.price * action.meal.amount;
    if (existingMeal) {
      const updatedMeal = {
        ...existingMeal,
        amount: existingMeal.amount + action.meal.amount,
      };
      // create new refrance array of meals
      updatedMeals = [...state.meals];
      // override old meal with the updated meal
      updatedMeals[existingMealIndex] = updatedMeal;
    } else {
      updatedMeals = state.meals.concat(action.meal);
    }
    return { meals: updatedMeals, totalPrice: totalMealPrice };
  }

  if (action.type === CART_TYPE.decrease) {
    // expecting meal id
    // if meal exist then decrease amount by one meal and adjust total price
    // if only one meal exist then remove it completly from cart
    existingMealIndex = state.meals.findIndex(
      meal => meal.id === action.mealId,
    );
    existingMeal = state.meals[existingMealIndex];
    totalMealPrice = state.totalPrice - existingMeal.price;
    if (existingMeal.amount === 1) {
      updatedMeals = state.meals.filter(meal => meal.id !== action.mealId);
    } else {
      const updatedMeal = {
        ...existingMeal,
        amount: existingMeal.amount - 1,
      };
      updatedMeals = [...state.meals];
      updatedMeals[existingMealIndex] = updatedMeal;
    }
    return { meals: updatedMeals, totalPrice: totalMealPrice };
  }

  if (action.type === CART_TYPE.remove) {
    // remove entier meal from cart
    existingMealIndex = state.meals.findIndex(
      meal => meal.id === action.mealId,
    );
    existingMeal = state.meals[existingMealIndex];
    updatedMeals = [...state.meals];
    updatedMeals = state.meals.filter(meal => meal.id !== action.mealId);
    totalMealPrice =
      state.totalPrice - existingMeal.price * existingMeal.amount;
    return { meals: updatedMeals, totalPrice: totalMealPrice };
  }
  return cartState;
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartState);

  const addMeal = meal => {
    dispatch({ type: CART_TYPE.add, meal });
  };
  const decreaseMeal = mealId => {
    dispatch({ type: CART_TYPE.decrease, mealId });
  };
  const removeMeal = mealId => {
    dispatch({ type: CART_TYPE.remove, mealId });
  };

  return (
    <CartContext.Provider
      value={{
        meals: state.meals,
        totalPrice: state.totalPrice,
        addMeal,
        decreaseMeal,
        removeMeal,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
