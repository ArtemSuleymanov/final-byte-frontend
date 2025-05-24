import LoginForm from '../../components/auth/LoginForm/LoginForm.jsx';
import s from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <main>
      <section className={s.container}>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
