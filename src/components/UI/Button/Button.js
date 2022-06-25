import styles from './Button.module.css';

const Button = ({ children, type, onClick, style, className }) => {
  return (
    <button
      style={{ ...style }}
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
