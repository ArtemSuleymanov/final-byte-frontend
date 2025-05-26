import s from './ProgressBar.module.css';

const ProgressBar = ({ status }) => {
  if (!status) return null;

  let color;
  switch (status) {
    case 'warn':
      color = '#FFA500'; 
      break;
    case 'success':
      color = '#4CAF50';
      break;
    case 'error':
      color = '#F44336'; 
      break;
    default:
      color = 'transparent';
  }

  return (
    <div className={s.barWrap}>
      <div className={s.bar} style={{ backgroundColor: color }} />
    </div>
  );
};

export default ProgressBar;
