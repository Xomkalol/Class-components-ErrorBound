import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
export const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .typeError('Age should be integer')
    .positive('Age should be more than 0')
    .integer('Age should be integer')
    .required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().min(6, 'should be more than 6').required('Пrequired'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'passwords should match')
    .required('confirm password required'),
  terms: yup.bool().oneOf([true], 'Need to accept terms'),
  gender: yup.string().required('required'),
  country: yup.string().required('required'),
});

export type FormData = yup.InferType<typeof schema>;
