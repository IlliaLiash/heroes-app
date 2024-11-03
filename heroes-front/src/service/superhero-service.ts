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
    if (Array.isArray(value)) {
      value.forEach((file) => formData.append(key, file));
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

const updateHero = async (heroData: UpdateSuperhero): Promise<Superhero> => {
  const formData = new FormData();

  Object.entries(heroData).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await api.put<Superhero>(
    `superhero/${heroData._id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

const removeHero = async (id: string): Promise<void> => {
  await api.delete(`superhero/${id}`);
};

export {
  fetchPaginatedHeroes,
  fetchOneHero,
  createHero,
  updateHero,
  removeHero,
};
