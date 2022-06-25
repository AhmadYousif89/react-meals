import styles from './Modal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

export default Backdrop;
