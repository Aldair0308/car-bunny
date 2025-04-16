import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LavadosService } from './lavados.service';
import { LavadosController } from './lavados.controller';
import { Lavado, LavadoSchema } from './schemas/lavado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lavado.name, schema: LavadoSchema }]),
  ],
  controllers: [LavadosController],
  providers: [LavadosService],
})
export class LavadosModule {}
