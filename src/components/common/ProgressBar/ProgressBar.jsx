import PasswordStrengthBar from 'react-password-strength-bar';
import s from './ProgressBar.module.css';

const ProgressBar = ({ value }) => {
  return (
    <div className={s.barWrap}>
      <PasswordStrengthBar password={value} />
    </div>
  );
};

export default ProgressBar;
