import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
import ProgressBar from '../../common/ProgressBar/ProgressBar.jsx';
import s from './AuthForm.module.css';
import { useConfirmPasswordStatus } from '../../../hooks/useConfirmPasswordStatus.js';

const AuthForm = ({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  buttonText,
  link,
  onPasswordChange,
    passwordValue,
  onConfirmPasswordChange,
  confirmPasswordValue,
  
  formClassName,
  imageClassName,
}) => {
  const confirmPasswordStatus = useConfirmPasswordStatus(passwordValue, confirmPasswordValue);
  return (
    <section className={s.container}>
      <div className={`${s.imageBg} ${imageClassName || ''}`}></div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, touched, errors }) => (
          <Form className={`${s.form} ${formClassName || ''}`} autoComplete="off">
            <div className={s.logoWrapper}>
              <svg className={s.logo} role="img" aria-hidden="true">
                <use href={`${sprite}#icon-wallet`} />
              </svg>
              <p className={s.logoText}>Spendy</p>
            </div>

            {fields.map(({ name, type = 'text', placeholder, icon }) => {
              const hasError = touched[name] && errors[name];
              const isValid = touched[name] && !errors[name];

              return (
                <label key={name} className={s.labelWraper}>
                  <div className={s.inputWrapper}>
                    <svg
                      className={`${s.icon} ${hasError ? s.iconError : isValid ? s.iconSuccess : ''}`}
                      role="img"
                      aria-hidden="true"
                    >
                      <use href={`${sprite}#${icon}`} />
                    </svg>
                    <Field
                      className={`${s.input} ${hasError ? s.inputError : isValid ? s.inputSuccess : ''}`}
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
                  {name === 'confirmPassword' && confirmPasswordValue && <ProgressBar status={confirmPasswordStatus} />}
                </label>
              );
            })}

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
    </section>
  );
};

export default AuthForm;
