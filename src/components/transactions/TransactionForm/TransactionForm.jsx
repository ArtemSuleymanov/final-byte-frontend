import { ErrorMessage, Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import s from './TransactionForm.module.css';
import Select from 'react-select';
import { categoriesList, typeList } from '../../../utils/constants';

const TransactionForm = ({ initialValues, onSubmit, onClose, showToast, innerRef, transactionType }) => {
  const expenseCategories = categoriesList.slice(1); // all except first

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be greater than zero')
      .required('Required field'),
    date: Yup.date().required('Required field'),
    category: Yup.string().required('Please select a category'),
    comment: Yup.string().max(30, 'Maximum 30 characters allowed'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log(values);

      const amountNumber = Number(values.amount);
      await onSubmit({ ...values, amount: amountNumber });
      onClose();
    } catch (error) {
      showToast(error.message || 'Something went wrong');
      setSubmitting(false);
    }
  };

  const defaultInitialValues = {
    amount: '',
    comment: 'by Spendy',
    category: transactionType ? expenseCategories[0] : categoriesList[0],
    type: transactionType ? typeList[1] : typeList[0],
    date: new Date(),
  };

  const inputClass = (fieldName, touched, errors) =>
    `${s.input} ${touched[fieldName] ? (errors[fieldName] ? s.inputError : s.inputSuccess) : ''}`;

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, touched, errors, isSubmitting }) => (
        <Form className={s.form} autoComplete="off">
          {transactionType ? (
            <label className={s.labelWrapper}>
              <Select
                name="category"
                options={expenseCategories.map((cat) => ({ value: cat, label: cat }))}
                value={values.category ? { value: values.category, label: values.category } : null}
                onChange={(option) => setFieldValue('category', option?.value || '')}
                placeholder="Category"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 8,
                    width: '100%',
                    height: 44,
                    border: `1px solid ${
                      touched.category && errors.category
                        ? 'var(--error-red)'
                        : touched.category
                        ? 'var(--succes-green)'
                        : 'var(--main-black)'
                    }`,
                    backgroundColor: 'inherit',
                    fontSize: 18,
                    boxShadow: 'none',
                    '&:hover': { borderColor: '#3b5d63' },
                  }),
                  valueContainer: (base) => ({ ...base, justifyContent: 'flex-start' }),
                  placeholder: (base) => ({ ...base, color: 'var(--main-black)', fontSize: 18 }),
                  singleValue: (base) => ({ ...base, color: 'var(--main-black)', fontSize: 18 }),
                  dropdownIndicator: (base) => ({ ...base, color: 'var(--main-black)', paddingRight: 14 }),
                  indicatorSeparator: () => ({ display: 'none' }),
                }}
              />
              <ErrorMessage name="category" component="span" className={s.span} />
            </label>
          ) : (
            <Field type="hidden" name="category" value={categoriesList[0]} />
          )}

          <div className={s.rowWrapper}>
            <label className={s.labelWrapper}>
              <input
                name="amount"
                type="number"
                placeholder="0.00"
                className={inputClass('amount', touched, errors)}
                step="0.01"
                value={values.amount || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFieldValue('amount', val);
                }}
              />
              <ErrorMessage name="amount" component="span" className={s.span} />
            </label>

            <label className={s.labelWrapper}>
              <DatePicker
                selected={values.date ? new Date(values.date) : new Date()}
                onChange={(date) => setFieldValue('date', date)}
                dateFormat="dd.MM.yyyy"
                className={inputClass('date', touched, errors)}
                placeholderText="Select a date"
                maxDate={new Date()}
              />
              <ErrorMessage name="date" component="span" className={s.span} />
            </label>
          </div>

          <label className={s.labelWrapper}>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={inputClass('comment', touched, errors)}
              maxLength={30}
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

export default TransactionForm;
