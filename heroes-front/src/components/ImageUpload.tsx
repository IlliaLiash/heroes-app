import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import Button from './Button';
import toast from 'react-hot-toast';
import { useAddImages, useRemoveImages } from '../hooks/superhero';

interface ImageUploadProps {
  heroId: string;
  existingUrl?: string;
  mode: 'create' | 'edit';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  heroId,
  existingUrl,
  mode,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const addImagesMutation = useAddImages();
  const removeImagesMutation = useRemoveImages();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      if (mode === 'create') {
        const updatedImages = [...(values.images || []), file];

        setFieldValue('images', updatedImages);
      } else if (mode === 'edit') {
        addImagesMutation.mutate(
          { id: heroId, images: [file] },
          {
            onSuccess: () => {
              toast.success('Image uploaded successfully!');
            },
            onError: (error: any) => {
              toast.error(`Error uploading image: ${error.message}`);
            },
          }
        );
      }
    }
  };

  const handleRemoveExistingImage = () => {
    if (mode === 'edit' && existingUrl) {
      removeImagesMutation.mutate(
        { id: heroId, imageUrls: [existingUrl] },
        {
          onSuccess: () => {
            toast.success('Image removed successfully!');
          },
          onError: (error: any) => {
            console.error('Error removing image:', error);
            toast.error(`Error removing image: ${error.message}`);
          },
        }
      );
    }
  };

  const handleRemoveNewImage = (removeIndex: number) => {
    if (mode === 'create') {
      const updatedImages = [...(values.images || [])];
      updatedImages.splice(removeIndex, 1);
      setFieldValue('images', updatedImages);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className='flex flex-col items-center space-y-2'>
      {mode === 'edit' && existingUrl ? (
        <>
          <img
            src={`${import.meta.env.VITE_BACKEND_API}${existingUrl}`}
            alt='Superhero Image'
            className='h-24 w-24 rounded object-cover'
          />
          <Button
            type='button'
            onClick={handleRemoveExistingImage}
            className='mt-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700'
          >
            Remove Image
          </Button>
        </>
      ) : (
        <>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-100'
          />
          {mode === 'create' && values.images && values.images.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-2'>
              {values.images.map((file: File, idx: number) => (
                <div key={idx} className='relative'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    className='h-24 w-24 rounded object-cover'
                    onLoad={() => {
                      URL.revokeObjectURL(file.name);
                    }}
                  />
                  <Button
                    type='button'
                    onClick={() => handleRemoveNewImage(idx)}
                    className='absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-700 focus:outline-none'
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageUpload;
