import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../common/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
