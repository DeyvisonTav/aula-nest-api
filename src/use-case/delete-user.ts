import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user/user-repository';

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  message: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);

    return { message: `${user.name} deleted` };
  }
}
