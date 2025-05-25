import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    isLoading && (
      <div className={styles.backdrop}>
        <BounceLoader color="#36d7b7" size={80} />
      </div>
    )
  );
};

export default Loader;
