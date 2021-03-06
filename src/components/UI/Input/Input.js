import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(
  ({ lable, input = {}, className, isError, error = {} }, ref) => {
    return (
      <div className={styles.input}>
        <label htmlFor={input.id}>{lable}</label>
        <input {...input} ref={ref} className={className} />
        {isError && <p className={error.style}>{error.msg}</p>}
      </div>
    );
  },
);

export default Input;
