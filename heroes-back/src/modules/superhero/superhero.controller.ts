import { Superhero } from '@/db/superhero.schema';
import { PaginationDto } from '@/modules/superhero/dto/pagination.dto';
import { CreateSuperheroDto } from '@/modules/superhero/dto/superhero.create.dto';
import { UpdateSuperheroDto } from '@/modules/superhero/dto/superhero.update.dto';
import { UploadImageDto } from '@/modules/superhero/dto/upload-image.dto';
import { SuperheroService } from '@/modules/superhero/superhero.service';
import { PaginatedResult } from '@/utils/types/pagination.type';
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @HttpCode(201)
  async create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroService.create(createSuperheroDto);
  }

  @Post(':id/images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageDto: UploadImageDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is not provided or invalid');
    }

    const imageUrl = `/uploads/${file.filename}`;

    const isMain = uploadImageDto.isMain || false;

    return this.superheroService.addImage(id, imageUrl, isMain);
  }

  @Get()
  @HttpCode(200)
  async find(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Superhero>> {
    return this.superheroService.findPaginated(paginationDto);
  }
}
