import React, { useState, useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';
import ImageUpload from '../components/ImageUpload';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createValidationSchema,
  updateValidationSchema,
} from '../utils/validation/superhero-form';
import {
  useCreateHero,
  useOneHero,
  useUpdateHero,
  useRemoveHero,
} from '../hooks/superhero';
import Loader from '../components/Loader';

interface CreateHeroFormValues {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  images: File[];
}

const CreateHeroPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const isEdit = !!id;

  const { data: heroData, isLoading: isHeroLoading } = useOneHero(id || '');

  const createHeroMutation = useCreateHero();
  const updateHeroMutation = useUpdateHero();
  const removeHeroMutation = useRemoveHero();

  const [initialValues, setInitialValues] = useState<CreateHeroFormValues>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    images: [],
  });

  useEffect(() => {
    if (isEdit && heroData) {
      setInitialValues({
        nickname: heroData.nickname,
        real_name: heroData.real_name,
        origin_description: heroData.origin_description,
        superpowers: heroData.superpowers,
        images: [],
      });
    }
  }, [isEdit, heroData]);

  const handleCreate = async (
    values: CreateHeroFormValues,
    actions: FormikHelpers<CreateHeroFormValues>
  ) => {
    await createHeroMutation.mutateAsync(values, {
      onSuccess: () => {
        toast.success('Hero created successfully!');
        actions.resetForm();
      },
      onError: (error: any) => {
        toast.error(`Error creating hero: ${error.message}`);
      },
    });

    actions.setSubmitting(false);
  };

  const handleUpdate = async (
    values: CreateHeroFormValues,
    actions: FormikHelpers<CreateHeroFormValues>
  ) => {
    const updateData = {
      nickname: values.nickname,
      real_name: values.real_name,
      origin_description: values.origin_description,
      superpowers: values.superpowers,
    };

    updateHeroMutation.mutate(
      {
        id: id!,
        data: updateData,
      },
      {
        onSuccess: () => {
          toast.success('Hero updated successfully!');
        },
        onError: (error: any) => {
          toast.error(`Error updating hero: ${error.message}`);
        },
      }
    );

    actions.setSubmitting(false);
  };

  const handleDelete = () => {
    removeHeroMutation.mutate(id!, {
      onSuccess: () => {
        toast.success('Hero deleted successfully!');
        navigate('/');
      },

      onError: (error: any) => {
        toast.error(`Error deleting hero: ${error.message}`);
      },
    });
  };

  if (isEdit && isHeroLoading) {
    return <Loader />;
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-2xl rounded bg-white px-8 pb-8 pt-6 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>
          {isEdit ? 'Hero Profile' : 'Create New Hero'}
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            isEdit ? updateValidationSchema : createValidationSchema
          }
          onSubmit={isEdit ? handleUpdate : handleCreate}
        >
          {() => (
            <Form>
              <TextInput
                label='Nickname'
                id='nickname'
                name='nickname'
                placeholder='Enter hero nickname'
              />

              <TextInput
                label='Real Name'
                id='real_name'
                name='real_name'
                placeholder='Enter hero real name'
              />

              <TextAreaInput
                label='Origin Description'
                id='origin_description'
                name='origin_description'
                placeholder='Describe the origin of your hero'
                rows={3}
              />

              <TextAreaInput
                label='Superpowers'
                id='superpowers'
                name='superpowers'
                placeholder="List your hero's superpowers"
                rows={3}
              />

              <div className='mb-6'>
                <label className='mb-2 block text-sm font-bold text-gray-700'>
                  Images
                </label>
                <div className='flex flex-wrap gap-4'>
                  {isEdit &&
                    heroData &&
                    heroData.images.map((imageUrl: string, index: number) => (
                      <ImageUpload
                        key={index}
                        heroId={id!}
                        existingUrl={imageUrl}
                        mode='edit'
                      />
                    ))}

                  {isEdit ? (
                    <ImageUpload heroId={id!} mode='edit' />
                  ) : (
                    <ImageUpload heroId='' mode='create' />
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <Button type='submit'>
                  {isEdit ? 'Update Hero' : 'Create Hero'}
                </Button>
                {isEdit && (
                  <Button
                    type='button'
                    className='bg-red-500 hover:bg-red-700'
                    onClick={handleDelete}
                  >
                    Delete Hero
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateHeroPage;
