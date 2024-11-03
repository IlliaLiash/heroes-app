import React from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import { useCreateHero } from '../hooks/superhero';
import { validationSchema } from '../utils/validation/create-hero-form';
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';
import Button from '../components/Button';
import toast from 'react-hot-toast';

interface CreateSuperhero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  images: File[];
}

const CreateSuperheroPage: React.FC = () => {
  const { mutate: createHero } = useCreateHero();

  const initialValues: CreateSuperhero = {
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    images: [],
  };

  const handleSubmit = async (
    values: CreateSuperhero,
    actions: FormikHelpers<CreateSuperhero>
  ) => {
    try {
      createHero(values);

      toast.success('Hero created successfully');
      actions.resetForm();
    } catch (error) {
      toast.error('An error occurred while creating the hero');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-2xl rounded bg-white px-8 pb-8 pt-6 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>
          Create New Superhero
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <TextInput
                label='Nickname'
                id='nickname'
                name='nickname'
                placeholder='Enter superhero nickname'
              />

              <TextInput
                label='Real Name'
                id='real_name'
                name='real_name'
                placeholder='Enter superhero real name'
              />

              <TextAreaInput
                label='Origin Description'
                id='origin_description'
                name='origin_description'
                placeholder='Describe the origin of your superhero'
                rows={3}
              />

              <TextAreaInput
                label='Superpowers'
                id='superpowers'
                name='superpowers'
                placeholder='List your superheros superpowers'
                rows={3}
              />

              <div className='mb-6'>
                <label className='mb-2 block text-sm font-bold text-gray-700'>
                  Images
                </label>
                <FieldArray name='images'>
                  {({ push, remove }) => (
                    <div>
                      {values.images && values.images.length > 0 && (
                        <div className='space-y-4'>
                          {values.images.map((_, index) => (
                            <div
                              key={index}
                              className='flex items-center space-x-4'
                            >
                              <input
                                id={`images.${index}`}
                                name={`images.${index}`}
                                type='file'
                                accept='image/*'
                                onChange={(event) => {
                                  const file =
                                    event.currentTarget.files &&
                                    event.currentTarget.files[0];
                                  if (file) {
                                    setFieldValue(`images.${index}`, file);
                                  }
                                }}
                                className='block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-100'
                              />
                              {values?.images[index] && (
                                <img
                                  src={URL.createObjectURL(
                                    values?.images[index]
                                  )}
                                  alt={`Preview ${index + 1}`}
                                  className='h-16 w-16 rounded object-cover'
                                />
                              )}
                              <button
                                type='button'
                                onClick={() => remove(index)}
                                className='text-red-500 hover:text-red-700 focus:outline-none'
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {values.images.length < 10 && (
                        <Button
                          type='button'
                          onClick={() => push(null)}
                          className='mt-4'
                        >
                          Add Image
                        </Button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage
                  name='images'
                  component='div'
                  className='mt-2 text-xs italic text-red-500'
                />
              </div>

              <div className='flex items-center justify-center'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className={`${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Superhero'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateSuperheroPage;
