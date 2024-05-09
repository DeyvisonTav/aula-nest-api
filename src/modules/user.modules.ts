import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { UserPrismaRepository } from 'src/repositories/prisma/user-prisma-repository';
import { UserRepository } from 'src/repositories/user/user-repository';
import { UserResolver } from 'src/resolvers/user.resolver';
import { AuthenticateUserUseCase } from 'src/use-case/authenticate-user';
import { DeleteUserUseCase } from 'src/use-case/delete-user';
import { FindByIdUserUseCase } from 'src/use-case/find-by-id-user';
import { RegisterUserUseCase } from 'src/use-case/register-user';

@Module({
  providers: [
    UserResolver,
    RegisterUserUseCase,
    FindByIdUserUseCase,
    DeleteUserUseCase,
    AuthenticateUserUseCase,

    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
  controllers: [UserController],
})
export class UserModule {}
