import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './schema/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}
}
