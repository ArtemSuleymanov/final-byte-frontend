import s from './Modal.module.css';
import Modal from 'react-modal';
import sprite from '../../../assets/sprite.svg';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

export default function CustomModal({
  isOpen,
  onClose,
  title,
  type = 'text',
  text = 'Some text',
  actionBtn = 'Accept',
  modalType,
  onConfirm = () => {},
  children,
  style,
}) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      toast.error(`Action failed: ${error}`);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={{
          base: clsx(s.modalContent, style),
          afterOpen: s['modalContent--after-open'],
          beforeClose: s['modalContent--before-close'],
        }}
        overlayClassName={s.modalOverlay}
        contentLabel="Modal"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <button className={s.closeBtn} onClick={onClose}>
          <svg className={s.icon} width="16" height="16">
            <use href={`${sprite}#icon-plus`} />
          </svg>
        </button>
        <div className={s.modal}>
          {type !== 'transaction' && (
            <svg className={s.iconDelete} width="54" height="54">
              <use href={`${sprite}#icon-wallet`} />
            </svg>
          )}
          <h2 className={s.title}>{title}</h2>
          {type === 'transaction' ? children : <p className={s.text}>{text}</p>}
          {type !== 'transaction' && (
            <button
              type="button"
              className={s.logoutBtn}
              style={modalType === 'delete' ? { backgroundColor: 'var(--error-red)', backgroundImage: 'none' } : {}}
              onClick={handleConfirm}
            >
              <p className={s.logoutBtnTxt}>{actionBtn}</p>
            </button>
          )}

          <button className={s.cancelBtn} onClick={onClose}>
            <p className={s.cancelBtnTxt}>Cancel</p>
          </button>
        </div>
      </Modal>
      {isOpen && <div className={s.backDrop} />}
    </>
  );
}
