import RegistrationForm from '../../components/auth/RegistrationForm/RegistrationForm.jsx';
import s from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <main>
      <section className={s.container}>
        <RegistrationForm />
      </section>
    </main>
  );
};

export default RegistrationPage;
