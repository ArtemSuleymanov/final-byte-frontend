import { ErrorMessage, Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import s from './EditTransactionForm.module.css';
import Select from 'react-select';

const EditTransactionForm = ({
  initialValues,
  onSubmit,
  categories,
  transactionType = true,
  onClose,
  showToast,
  innerRef,
}) => {
  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero')
      .required('Required field'),
    date: Yup.date().required('Required field'),
    category: Yup.string().required('Please select a category'),
    comment: Yup.string().max(50, 'Maximum 50 characters allowed'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
      onClose();
    } catch (error) {
      showToast(error.message || 'Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values = {}, setFieldValue, isSubmitting, touched, errors }) => (
        <Form className={s.form} autoComplete="off">
          {transactionType && (
            <label className={s.labelWrapper}>
              <Select
                name="category"
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                value={
                  categories
                    .map((cat) => ({ value: cat.id, label: cat.name }))
                    .find((option) => option.value === values.category) || null
                }
                onChange={(selectedOption) => setFieldValue('category', selectedOption?.value || '')}
                placeholder="Select category"
                classNamePrefix="react-select"
                className={touched.category && errors.category ? s.inputError : touched.category ? s.inputSuccess : ''}
              />
              <ErrorMessage name="category" component="span" className={s.span} />
            </label>
          )}

          <label className={s.labelWrapper}>
            <Field
              name="amount"
              type="number"
              placeholder="0.00"
              className={`${s.input} ${
                touched.amount && errors.amount ? s.inputError : touched.amount ? s.inputSuccess : ''
              }`}
              step="0.5"
            />
            <ErrorMessage name="amount" component="span" className={s.span} />
          </label>

          <label className={s.labelWrapper}>
            <DatePicker
              selected={values.date ? new Date(values.date) : Date.now()}
              onChange={(date) => setFieldValue('date', date)}
              dateFormat="dd.MM.yyyy"
              className={`${s.input} ${
                touched.date && errors.date ? s.inputError : touched.date ? s.inputSuccess : ''
              }`}
              placeholderText="Select a date"
              maxDate={new Date()}
            />
            <ErrorMessage name="date" component="span" className={s.span} />
          </label>

          <label className={s.labelWrapper}>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={`${s.input} ${
                touched.comment && errors.comment ? s.inputError : touched.comment ? s.inputSuccess : ''
              }`}
              maxLength={50}
              rows={3}
              style={{ resize: 'none' }}
            />
            <ErrorMessage name="comment" component="span" className={s.span} />
          </label>

          <button type="submit" disabled={isSubmitting} className={s.button} style={{ display: 'none' }}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditTransactionForm;
