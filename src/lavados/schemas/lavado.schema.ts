import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LavadoDocument = Lavado & Document;

class Extra {
  @Prop()
  photo: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

@Schema()
export class Lavado {
  @Prop()
  size: string;

  @Prop()
  type: string;

  @Prop()
  date: Date;

  @Prop()
  price: number;

  @Prop()
  subtotal: number;

  @Prop()
  total: number;

  @Prop()
  responsible: string;

  @Prop()
  status: string;

  @Prop({ type: [Extra] })
  extras: Extra[];
}

export const LavadoSchema = SchemaFactory.createForClass(Lavado);
