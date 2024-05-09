import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from 'src/dto/create-user.input';
import {
  RegisterUserResponse,
  RegisterUserUseCase,
} from 'src/use-case/register-user';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async register(@Body() body: CreateUserInput): Promise<RegisterUserResponse> {
    return await this.registerUserUseCase.execute(body);
  }
}
