import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { Extra, ExtraDocument } from './entities/extra.entity';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectModel(Extra.name) private extraModel: Model<ExtraDocument>,
  ) {}

  async create(createExtraDto: CreateExtraDto): Promise<Extra> {
    const createdExtra = new this.extraModel(createExtraDto);
    return createdExtra.save();
  }

  async findAll(): Promise<Extra[]> {
    return this.extraModel.find().exec();
  }

  async findOffers(): Promise<Extra[]> {
    return this.extraModel.find({ type: 'o' }).exec();
  }

  async findOne(id: string): Promise<Extra> {
    return this.extraModel.findById(id).exec();
  }

  async update(id: string, updateExtraDto: UpdateExtraDto): Promise<Extra> {
    return this.extraModel
      .findByIdAndUpdate(id, updateExtraDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Extra> {
    return this.extraModel.findByIdAndDelete(id).exec();
  }
}
