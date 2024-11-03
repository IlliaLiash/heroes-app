import React from 'react';
import { Superhero } from '../utils/types/superhero';

interface HeroesListItemProps {
  hero: Superhero;
}

const HeroesListItem = ({ hero }: HeroesListItemProps) => {
  return (
    <div className='flex flex-col items-center gap-4 bg-gray-300 px-12 py-10 shadow-md'>
      {hero.images?.length ? (
        <img
          src={
            hero.images[0]
              ? `${import.meta.env.VITE_BACKEND_API}${hero.images[0]}`
              : '../../../public/profile-image.webp'
          }
          alt={`${hero.nickname} image`}
          className='h-32 w-32 rounded-lg object-cover'
        />
      ) : (
        <img
          src='../../../public/profile-image.webp'
          alt={'empty profile image'}
          className='h-32 w-32 rounded-lg object-cover'
        />
      )}
      <p>{hero.nickname}</p>
    </div>
  );
};

export default HeroesListItem;
