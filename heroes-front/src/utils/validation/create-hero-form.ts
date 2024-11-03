import * as Yup from 'yup';

export const validationSchema = Yup.object({
  nickname: Yup.string().required('Nickname is required'),
  real_name: Yup.string().required('Real name is required'),
  origin_description: Yup.string().required('Origin description is required'),
  superpowers: Yup.string().required('Superpowers are required'),
  images: Yup.array()
    .of(
      Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Each image must be less than 5MB', (value) => {
          return value && (value as File).size <= 5 * 1024 * 1024;
        })
        .test(
          'fileType',
          'Only JPG, JPEG, PNG, and GIF files are allowed',
          (value) => {
            return (
              value &&
              ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(
                (value as File).type
              )
            );
          }
        )
    )
    .max(10, 'You can upload up to 10 images'),
});
