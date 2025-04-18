import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLavadoDto } from './dto/create-lavado.dto';
import { UpdateLavadoDto } from './dto/update-lavado.dto';
import { Lavado } from './schemas/lavado.schema';

@Injectable()
export class LavadosService {
  constructor(@InjectModel(Lavado.name) private lavadoModel: Model<Lavado>) {}

  async create(createLavadoDto: CreateLavadoDto): Promise<Lavado> {
    const createdLavado = new this.lavadoModel(createLavadoDto);
    return createdLavado.save();
  }

  async findAll(): Promise<Lavado[]> {
    return this.lavadoModel.find().exec();
  }

  async findPending(): Promise<Lavado[]> {
    return this.lavadoModel.find({ status: 'pending' }).exec();
  }

  async findFinished(): Promise<Lavado[]> {
    return this.lavadoModel.find({ status: 'completed' }).exec();
  }

  async findOne(id: string): Promise<Lavado> {
    return this.lavadoModel.findById(id).exec();
  }

  async update(id: string, updateLavadoDto: UpdateLavadoDto): Promise<Lavado> {
    return this.lavadoModel
      .findByIdAndUpdate(id, updateLavadoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Lavado> {
    return this.lavadoModel.findByIdAndDelete(id).exec();
  }
}
