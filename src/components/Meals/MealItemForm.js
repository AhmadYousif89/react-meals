import { useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = ({ mealId, onAddMeal }) => {
  const [error, setError] = useState(false);
  const amountInputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const amount = amountInputRef.current.value;
    if (!amount || +amount <= 0) return setError(true);
    setError(false);
    onAddMeal(amount);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        lable={'Amount'}
        ref={amountInputRef}
        input={{
          id: `amount ${mealId}`,
          type: 'number',
          min: '1',
          max: '10',
        }}
        className={`${error && classes['input-error']}`}
      />
      <Button type='submit'>+ Add</Button>
    </form>
  );
};

export default MealItemForm;
