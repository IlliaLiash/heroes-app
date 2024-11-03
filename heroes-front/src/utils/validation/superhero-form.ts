import * as Yup from 'yup';

export const createValidationSchema = Yup.object({
  nickname: Yup.string().required('Nickname is required'),
  real_name: Yup.string().required('Real name is required'),
  origin_description: Yup.string().required('Origin description is required'),
  superpowers: Yup.string().required('Superpowers are required'),
  images: Yup.array()
    .of(Yup.mixed<File>())
    .max(10, 'You can upload up to 10 images'),
});

export const updateValidationSchema = Yup.object({
  nickname: Yup.string().required('Nickname is required'),
  real_name: Yup.string().required('Real name is required'),
  origin_description: Yup.string().required('Origin description is required'),
  superpowers: Yup.string().required('Superpowers are required'),
});
