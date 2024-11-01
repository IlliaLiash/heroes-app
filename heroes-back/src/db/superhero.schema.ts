import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ default: false })
  isMain: boolean;
}
const ImageSchema = SchemaFactory.createForClass(Image);

@Schema()
export class Superhero {
  @Prop()
  nickname: string;

  @Prop()
  real_name: string;

  @Prop()
  origin_desciption: string;

  @Prop()
  superpowers: string;

  @Prop({ type: [ImageSchema], default: [] })
  images: Image[];
}

export type SuperheroDocument = Superhero & Document;

export const SuperheroSchema = SchemaFactory.createForClass(Superhero);
