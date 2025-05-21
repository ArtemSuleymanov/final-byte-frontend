import { useState } from 'react';
import * as Yup from 'yup';
import AuthForm from '../AuthForm/AuthForm.jsx';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../../redux/auth/authOperations.js';

const registrationFields = [
  { name: 'name', placeholder: 'Name', icon: 'icon-user-02' },
  { name: 'email', type: 'email', placeholder: 'Email', icon: 'icon-email' },
  { name: 'password', type: 'password', placeholder: 'Password', icon: 'icon-lock' },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    icon: 'icon-lock',
  },
];

const registrationInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const registrationValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Required')
    .matches(/^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/, 'Invalid format'),
  email: Yup.string().email('Invalid email format').max(64, 'Too long!').required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(64, 'Too long!')
    .matches(/^[A-Za-z0-9]+$/, 'Only Latin letters')
    .matches(/[A-Z]/, 'Must have 1 uppercase')
    .matches(/\d/, 'Must have 1 number')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const handleSubmit = (values, actions) => {
    const { name, email, password } = values;
    console.log('Register values:', {name, email, password});
    dispatch(registerThunk({name, email, password}))
    actions.resetForm();
    // Тут буде логіка реєстрації
  };

  return (
    <>
      <AuthForm
        fields={registrationFields}
        initialValues={registrationInitialValues}
        validationSchema={registrationValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Register"
        link={{
          to: '/login',
          text: 'Login',
        }}
        onPasswordChange={setPasswordValue}
        passwordValue={passwordValue}
        onConfirmPasswordChange={setConfirmPasswordValue}
        confirmPasswordValue={confirmPasswordValue}
      />
    </>
  );
};

export default RegistrationForm;
