import { User } from 'src/entities/user.entity';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/repositories/user/user-repository';
import { Injectable } from '@nestjs/common';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface AuthenticateUserResponse {
  user: User;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    return {
      user: user,
    };
  }
}
