import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { Extra, ExtraSchema } from './entities/extra.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Extra.name, schema: ExtraSchema }]),
  ],
  controllers: [ExtrasController],
  providers: [ExtrasService],
})
export class ExtrasModule {}
