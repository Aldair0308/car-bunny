import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExtraDocument = Extra & Document;

@Schema()
export class Extra {
  @Prop()
  photo: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ default: 'active' })
  state: string;
}

export const ExtraSchema = SchemaFactory.createForClass(Extra);
