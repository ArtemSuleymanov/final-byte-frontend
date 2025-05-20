import * as Yup from 'yup';
import AuthForm from '../AuthForm/AuthForm.jsx';

const loginFields = [
  { name: 'email', type: 'email', placeholder: 'Email' },
  { name: 'password', type: 'password', placeholder: 'Password' },
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
  const handleSubmit = (values, actions) => {
    console.log('Login form submitted:', values);
    actions.resetForm();
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
