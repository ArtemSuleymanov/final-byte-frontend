import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginThunk } from '../../../redux/auth/authOperations.js';
import AuthForm from '../AuthForm/AuthForm.jsx';

const loginFields = [
  { name: 'email', type: 'email', placeholder: 'Email', icon: 'icon-email' },
  { name: 'password', type: 'password', placeholder: 'Password', icon: 'icon-lock' },
];

const loginInitialValues = {
  email: '',
  password: '',
};

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').max(64, 'Too long!').required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(64, 'Too long!')
    .matches(/^[A-Za-z0-9]+$/, 'Only Latin letters')
    .matches(/[A-Z]/, 'Must have 1 uppercase')
    .matches(/\d/, 'Must have 1 number')
    .required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    console.log('Login form submitted:', values);
    try {
      await dispatch(loginThunk(values)).unwrap();
      navigate('/home');
      actions.resetForm();
    } catch (error) {
      return toast.error(error || 'Login failed');
    }
  };

  return (
    <div>
      <AuthForm
        fields={loginFields}
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Login"
        link={{ to: '/register', text: 'Register' }}
      />
    </div>
  );
};

export default LoginForm;
