import { Document, Model } from 'mongoose';
import { BaseRepositoryInterface } from './base.repository.interface';

export class BaseRepository<T extends Document>
  implements BaseRepositoryInterface<T>
{
  constructor(private readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    const newItem = new this.model(item);
    return newItem.save();
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
