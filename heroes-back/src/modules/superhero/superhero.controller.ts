import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuperheroService } from '@/modules/superhero/superhero.service';
import { CreateSuperheroDto } from '@/modules/superhero/dto/superhero.create.dto';
import { UpdateSuperheroDto } from '@/modules/superhero/dto/superhero.update.dto';
import { PaginationDto } from '@/modules/superhero/dto/pagination.dto';
import { PaginatedResult } from '@/utils/types/pagination.type';
import { Superhero } from '@/db/superhero.schema';
import { UploadImages } from '@/utils/decorators/upload-images.decorator';

@ApiTags('superhero')
@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return this.superheroService.getById(id);
  }

  @Patch(':id')
  @HttpCode(201)
  async update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string) {
    return this.superheroService.delete(id);
  }

  @Post()
  @UploadImages(10)
  @HttpCode(201)
  async create(
    @Body() createSuperheroDto: CreateSuperheroDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = files.map((file) => `/uploads/${file.filename}`);
    }

    const newSuperhero = { ...createSuperheroDto, images: imageUrls };

    return this.superheroService.create(newSuperhero);
  }

  @Post(':id/images')
  @UploadImages(10)
  @HttpCode(201)
  async addImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imageUrls = files.map((file) => `/uploads/${file.filename}`);

    return this.superheroService.addImages(id, imageUrls);
  }

  @Get()
  @HttpCode(200)
  async find(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Superhero>> {
    return this.superheroService.findPaginated(paginationDto);
  }

  @Delete(':id/images')
  @HttpCode(200)
  async removeImages(
    @Param('id') id: string,
    @Body('imageUrls') imageUrls: string[],
  ) {
    return this.superheroService.removeImages(id, imageUrls);
  }
}
