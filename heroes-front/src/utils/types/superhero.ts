export interface Superhero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  images: string[];
}

export interface SuperheroImage {
  url: string;
  isMain: boolean;
}

export interface CreateSuperhero extends Omit<Superhero, '_id' | 'images'> {
  images?: File[];
}

export interface UpdateSuperhero extends Partial<Superhero> {}
