import s from './Modal.module.css';
import Modal from 'react-modal';
import sprite from '../../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../../redux/auth/authOperations';
import { toast } from 'react-hot-toast';

export default function LogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (error) {
      toast.error(`Logout failed: ${error}`);
    } finally {
      localStorage.clear();
      onClose();
      navigate('/login', { replace: true });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={{
          base: s.modalContent,
          afterOpen: s['modalContent--after-open'],
          beforeClose: s['modalContent--before-close'],
        }}
        overlayClassName={s.modalOverlay}
        contentLabel="Logout Modal"
        closeTimeoutMS={300}
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
      {isOpen && <div className={s.backDrop} />}
    </>
  );
}
