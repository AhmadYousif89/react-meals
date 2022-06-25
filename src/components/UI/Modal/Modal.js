import ReactDom from 'react-dom';
import Backdrop from './Backdrop';
import styles from './Modal.module.css';

const Modal = ({ children, onClick }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={onClick} />,
        document.querySelector('#backdrop'),
      )}
      {ReactDom.createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>{children}</div>
        </div>,
        document.querySelector('#modal'),
      )}
    </>
  );
};

export default Modal;
