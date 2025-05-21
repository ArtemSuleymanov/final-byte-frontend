import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
import ProgressBar from '../../common/ProgressBar/ProgressBar.jsx';
import s from './AuthForm.module.css';

const AuthForm = ({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  buttonText,
  link,
  onPasswordChange,
  //   passwordValue,
  onConfirmPasswordChange,
  confirmPasswordValue,
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange }) => (
        <Form className={s.form} autoComplete="off">
          {/* <img className={s.logo} src="/images/logo.svg" alt="logo" /> */}

          {fields.map(({ name, type = 'text', placeholder, icon }) => (
            <label key={name} className={s.labelWraper}>
              <div className={s.inputWrapper}>
                <svg className={s.icon} role="img" aria-hidden="true">
                  <use href={`${sprite}#${icon}`} />
                </svg>
                <Field
                  className={s.input}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange(e);
                    if (name === 'password' && onPasswordChange) {
                      onPasswordChange(e.target.value);
                    }
                    if (name === 'confirmPassword' && onConfirmPasswordChange) {
                      onConfirmPasswordChange(e.target.value);
                    }
                  }}
                />
              </div>
              <ErrorMessage className={s.span} name={name} component="span" />

              {name === 'confirmPassword' && confirmPasswordValue && <ProgressBar value={confirmPasswordValue} />}
            </label>
          ))}

          <button className={s.button} type="submit">
            {buttonText}
          </button>

          {link && (
            <p className={s.linkName}>
              <Link to={link.to}>{link.text}</Link>
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
