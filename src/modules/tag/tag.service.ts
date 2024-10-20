import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../../common/database/schemas/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}
}
