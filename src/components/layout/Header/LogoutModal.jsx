import s from './LogoutModal.module.css';
import Modal from 'react-modal';
import sprite from '../../../assets/sprite.svg';

export default function LogoutModal({ isOpen, onClose }) {
  const handleLogout = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modalContent}
      overlayClassName={s.modalOverlay}
      contentLabel="Logout Modal"
      ariaHideApp={false}
    >
      <div className={s.modal}>
        <svg className={s.icon} width="54" height="54">
          <use href={`${sprite}#icon-wallet`} />
        </svg>
        <h2 className={s.title}>Spendy</h2>
        <p className={s.text}>Are you sure you want to log out?</p>
        <button className={s.logoutBtn} onClick={handleLogout}>
          <p className={s.logoutBtnTxt}>Logout</p>
        </button>
        <button className={s.cancelBtn} onClick={onClose}>
          <p className={s.cancelBtnTxt}>Cancel</p>
        </button>
      </div>
    </Modal>
  );
}
