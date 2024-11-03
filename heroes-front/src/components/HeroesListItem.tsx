import React from 'react';
import { Superhero } from '../utils/types/superhero';
import { Link } from 'react-router-dom';

interface HeroesListItemProps {
  hero: Superhero;
}

const HeroesListItem = ({ hero }: HeroesListItemProps) => {
  const defaultImage = '/profile-image.webp';

  const heroImage = hero.images?.[0]
    ? `${import.meta.env.VITE_BACKEND_API}${hero.images[0]}`
    : defaultImage;

  return (
    <Link
      to={`/${hero._id}`}
      className='block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl'
    >
      <div className='h-48 w-full overflow-hidden'>
        <img
          src={heroImage}
          alt={`${hero.nickname} image`}
          className='h-full w-full transform object-cover transition-transform duration-300 hover:scale-105'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-center text-xl font-semibold text-gray-800'>
          {hero.nickname}
        </h3>
      </div>
    </Link>
  );
};

export default HeroesListItem;
