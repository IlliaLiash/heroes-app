import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Superhero,
  CreateSuperhero,
  UpdateSuperhero,
} from '../utils/types/superhero';
import { PaginatedResult } from '../utils/types/pagination';
import {
  fetchPaginatedHeroes,
  fetchOneHero,
  createHero,
  updateHero,
  removeHero,
  removeImages,
  addImages,
} from '../service/superhero-service';

export const usePaginatedHeroes = (page: number, limit: number) =>
  useQuery<PaginatedResult<Superhero>, Error>({
    queryKey: ['superheroes', page, limit],
    queryFn: () => fetchPaginatedHeroes(page, limit),
  });

export const useOneHero = (id: string) =>
  useQuery<Superhero, Error>({
    queryKey: ['superhero', id],
    queryFn: () => fetchOneHero(id),
    enabled: !!id,
  });

export const useCreateHero = () => {
  const queryClient = useQueryClient();
  return useMutation<Superhero, Error, CreateSuperhero>({
    mutationFn: createHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superheroes'] });
    },
  });
};

export const useUpdateHero = () => {
  const queryClient = useQueryClient();
  return useMutation<Superhero, Error, { id: string; data: UpdateSuperhero }>({
    mutationFn: ({ id, data }) => updateHero(id, data),
    onSuccess: (data: Superhero) => {
      queryClient.invalidateQueries({ queryKey: ['superheroes'] });
      queryClient.invalidateQueries({ queryKey: ['superhero', data._id] });
    },
  });
};

export const useRemoveHero = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => removeHero(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superheroes'] });
    },
  });
};

export const useAddImages = () => {
  const queryClient = useQueryClient();
  return useMutation<Superhero, Error, { id: string; images: File[] }>({
    mutationFn: ({ id, images }) => addImages(id, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superhero'] });
    },
  });
};

export const useRemoveImages = () => {
  const queryClient = useQueryClient();
  return useMutation<Superhero, Error, { id: string; imageUrls: string[] }>({
    mutationFn: ({ id, imageUrls }) => removeImages(id, imageUrls),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superhero'] });
    },
  });
};
