import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
