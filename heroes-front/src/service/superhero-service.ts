import api from './api';
import {
  Superhero,
  CreateSuperhero,
  UpdateSuperhero,
} from '../utils/types/superhero';
import { PaginatedResult } from '../utils/types/pagination';

const fetchPaginatedHeroes = async (
  page: number,
  limit: number
): Promise<PaginatedResult<Superhero>> => {
  const { data } = await api.get<PaginatedResult<Superhero>>('superhero', {
    params: { page, limit },
  });

  return data;
};

const fetchOneHero = async (id: string): Promise<Superhero> => {
  const { data } = await api.get<Superhero>(`superhero/${id}`);

  return data;
};

const createHero = async (heroData: CreateSuperhero): Promise<Superhero> => {
  const formData = new FormData();

  Object.entries(heroData).forEach(([key, value]) => {
    if (key === 'images' && Array.isArray(value)) {
      value.forEach((file) => formData.append('images', file));
    } else {
      formData.append(key, value);
    }
  });

  const { data } = await api.post<Superhero>('superhero', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

const updateHero = async (
  id: string,
  heroData: UpdateSuperhero
): Promise<Superhero> => {
  const { data } = await api.patch<Superhero>(`superhero/${id}`, heroData);

  return data;
};

const removeHero = async (id: string): Promise<void> => {
  await api.delete(`superhero/${id}`);
};

const addImages = async (id: string, images: File[]): Promise<Superhero> => {
  const formData = new FormData();

  images.forEach((image) => formData.append('images', image));

  const { data } = await api.post<Superhero>(
    `superhero/${id}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};

const removeImages = async (
  id: string,
  imageUrls: string[]
): Promise<Superhero> => {
  const { data } = await api.delete<Superhero>(`superhero/${id}/images`, {
    data: { imageUrls },
  });

  return data;
};

export {
  fetchPaginatedHeroes,
  fetchOneHero,
  createHero,
  updateHero,
  removeHero,
  addImages,
  removeImages,
};
