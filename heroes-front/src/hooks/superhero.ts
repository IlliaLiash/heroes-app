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
  return useMutation<Superhero, Error, UpdateSuperhero>({
    mutationFn: updateHero,
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
