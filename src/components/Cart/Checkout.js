import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const inputIsValid = input => input.trim() !== '' && input.length > 2;

const Checkout = ({ onClose, onOrderConfim }) => {
  const nameRef = useRef('');
  const postalRef = useRef('');
  const addressRef = useRef('');
  const paymentRef = useRef('');
  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    postal: true,
    payment: true,
  });

  const submitHandler = e => {
    e.preventDefault();
    // read input value
    const nameValue = nameRef.current.value;
    const postalValue = postalRef.current.value;
    const addressValue = addressRef.current.value;
    const paymentValue = paymentRef.current.value;
    // input is valid if it pass's the input validation
    const nameIsValid = inputIsValid(nameValue);
    const addressIsValid = inputIsValid(addressValue);
    const postalIsValid = inputIsValid(postalValue);
    const paymentIsValid = inputIsValid(paymentValue);
    // set form validity based on inputs validity
    setFormValidity({
      name: nameIsValid,
      address: addressIsValid,
      postal: postalIsValid,
      payment: paymentIsValid,
    });
    const formIsValid =
      nameIsValid && addressIsValid && postalIsValid && paymentIsValid;
    // stop excution if form is NOT valid
    if (!formIsValid) return;

    const userData = {
      name: nameValue,
      address: addressValue,
      postalCode: postalValue,
      paymentMethod: paymentValue,
    };
    onOrderConfim(userData);
    // reset form inputs
    nameRef.current.value = '';
    postalRef.current.value = '';
    addressRef.current.value = '';
    paymentRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={
          !formValidity.name
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formValidity.name && (
          <span className={classes['error-text']}>* name is required</span>
        )}
      </div>
      <div
        className={
          !formValidity.address
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressRef} />
        {!formValidity.address ? (
          <span className={classes['error-text']}>* address is required</span>
        ) : null}
      </div>
      <div
        className={
          !formValidity.postal
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }>
        <label htmlFor='postal'>Postal code</label>
        <input type='text' id='postal' ref={postalRef} />
        {!formValidity.postal ? (
          <span className={classes['error-text']}>
            * postal code is required
          </span>
        ) : null}
      </div>
      <div
        className={
          !formValidity.payment
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }>
        <label htmlFor='payment'>Payment method</label>
        <input type='text' id='payment' ref={paymentRef} />
        {!formValidity.payment ? (
          <span className={classes['error-text']}>
            * payment method is required
          </span>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type='button' onClick={onClose}>
          Cancle
        </button>
      </div>
    </form>
  );
};

export default Checkout;
