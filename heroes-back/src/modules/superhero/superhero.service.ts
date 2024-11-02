import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Superhero, SuperheroDocument } from '@/db/superhero.schema';
import { CreateSuperheroDto } from '@/modules/superhero/dto/superhero.create.dto';
import { UpdateSuperheroDto } from '@/modules/superhero/dto/superhero.update.dto';
import { PaginationDto } from '@/modules/superhero/dto/pagination.dto';
import { PaginatedResult } from '@/utils/types/pagination.type';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectModel(Superhero.name)
    private superheroModel: Model<SuperheroDocument>,
  ) {}

  async getById(id: string): Promise<SuperheroDocument> {
    const hero = await this.superheroModel.findById(id).exec();

    if (!hero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    return hero;
  }

  async create(newSuperhero: CreateSuperheroDto): Promise<SuperheroDocument> {
    return this.superheroModel.create(newSuperhero);
  }

  async update(
    id: string,
    updateSuperhero: UpdateSuperheroDto,
  ): Promise<SuperheroDocument> {
    const updatedHero = await this.superheroModel
      .findByIdAndUpdate(id, updateSuperhero, { new: true })
      .exec();

    if (!updatedHero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    return updatedHero;
  }

  async delete(id: string): Promise<SuperheroDocument> {
    const deletedHero = await this.superheroModel.findByIdAndDelete(id).exec();

    if (!deletedHero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    return deletedHero;
  }

  async addImages(id: string, imageUrls: string[]): Promise<SuperheroDocument> {
    const hero = await this.superheroModel.findById(id).exec();

    if (!hero) {
      throw new NotFoundException(`Superhero with id ${id} not found`);
    }

    hero.images.push(...imageUrls);

    return hero.save();
  }

  async findPaginated(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<SuperheroDocument>> {
    const { page = 1, limit = 10 } = paginationDto;

    const skip = (page - 1) * limit;

    const totalItems = await this.superheroModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages && totalPages !== 0) {
      throw new BadRequestException('Page greater than total pages');
    }

    const isNextPage = page < totalPages;

    const items = await this.superheroModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      currentPage: page,
      totalPages,
      isNextPage,
      items,
      totalItems,
    };
  }
}
