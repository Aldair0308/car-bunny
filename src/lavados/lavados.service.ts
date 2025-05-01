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

  async findByResponsibleGroupedByDate(responsible: string) {
    const formattedResponsible = responsible.replace(/-/g, ' ');
    return this.lavadoModel
      .aggregate([
        {
          $match: {
            responsible: formattedResponsible,
            status: 'completed',
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$date' },
            },
            lavados: { $push: '$$ROOT' },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }

  async findByWeek(): Promise<Lavado[]> {
    const now = new Date();
    const currentDay = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return this.lavadoModel
      .find({
        date: {
          $gte: monday,
          $lte: sunday,
        },
      })
      .exec();
  }

  async removeByWeek(startDate: string): Promise<{ deleted: number }> {
    const monday = new Date(startDate);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const result = await this.lavadoModel
      .deleteMany({
        date: {
          $gte: monday,
          $lte: sunday,
        },
      })
      .exec();

    return { deleted: result.deletedCount };
  }

  async findAllGroupedByWeek() {
    return this.lavadoModel
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: {
                  $dateFromParts: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    day: {
                      $subtract: [
                        { $dayOfMonth: '$date' },
                        { $subtract: [{ $dayOfWeek: '$date' }, 1] },
                      ],
                    },
                  },
                },
              },
            },
            firstId: { $first: '$_id' },
            count: { $sum: 1 },
            lavados: { $push: '$$ROOT' },
          },
        },
        { $sort: { _id: -1 } },
      ])
      .exec();
  }
}
