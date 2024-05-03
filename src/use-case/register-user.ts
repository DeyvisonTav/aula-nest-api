import { User } from '../entities/user.entity';
import { UserRepository } from 'src/repositories/user/user-repository';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const passwordHash = await hash(password, 6);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const _user = User.save(name, email, passwordHash);

    const user = await this.userRepository.save(_user);

    return { user };
  }
}
