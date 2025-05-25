import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../../redux/auth/authOperations';
import { toast } from 'react-hot-toast';
import CustomModal from '../../common/Modal/Modal';
import s from './LogoutModal.module.css';

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
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Log out"
      text="Are you sure you want to log out?"
      actionBtn="Log out"
      onConfirm={handleLogout}
      style={s.modalContainer}
    />
  );
}
