import styles from './LogoutModal.module.css';
import Modal from 'react-modal';

export default function LogoutModal({ isOpen, onClose }) {
  const handleLogout = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      contentLabel="Logout Modal"
      ariaHideApp={false}
    >
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <svg className={styles.logoIcon} width="40" height="40">
            <use href="/sprite.svg#icon-wallet" />
          </svg>
          <h2 className={styles.title}>Spendy</h2>
          <p className={styles.text}>Are you sure you want to log out?</p>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
