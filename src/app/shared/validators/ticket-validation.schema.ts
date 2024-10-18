import * as Yup from 'yup';

export const ticketValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Open', 'Closed'], 'Invalid status'),
  date: Yup.date()
    .required('Date is required')
    .typeError('Date must be a valid date'),
});
