import { Document, Model } from 'mongoose';

export interface BaseRepositoryInterface<T extends Document> {
  create(item: Partial<T>): Promise<T>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}
