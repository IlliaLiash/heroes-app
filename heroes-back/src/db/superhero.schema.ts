import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Superhero {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  real_name: string;

  @Prop({ required: true })
  origin_description: string;

  @Prop({ required: true })
  superpowers: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type SuperheroDocument = Superhero & Document;

export const SuperheroSchema = SchemaFactory.createForClass(Superhero);
