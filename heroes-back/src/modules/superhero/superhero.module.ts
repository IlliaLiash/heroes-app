import { Superhero, SuperheroSchema } from '@/db/superhero.schema';
import { SuperheroController } from '@/modules/superhero/superhero.controller';
import { SuperheroService } from '@/modules/superhero/superhero.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Superhero.name, schema: SuperheroSchema },
    ]),
  ],
  controllers: [SuperheroController],
  providers: [SuperheroService],
})
export class SuperheroModule {}
