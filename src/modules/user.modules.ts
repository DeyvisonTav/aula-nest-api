import { Module } from '@nestjs/common';
import { UserPrismaRepository } from 'src/repositories/prisma/user-prisma-repository';
import { UserRepository } from 'src/repositories/user/user-repository';
import { UserResolver } from 'src/resolvers/user.resolver';
import { DeleteUserUseCase } from 'src/use-case/delete-user';
import { FindByIdUserUseCase } from 'src/use-case/find-by-id-user';
import { RegisterUserUseCase } from 'src/use-case/register-user';

@Module({
  providers: [
    UserResolver,
    RegisterUserUseCase,
    FindByIdUserUseCase,
    DeleteUserUseCase,

    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
  controllers: [],
})
export class UserModule {}
