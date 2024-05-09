import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput } from 'src/dto/create-user.input';
import { User } from 'src/entities/user.entity';
import { AuthenticateUserUseCase } from 'src/use-case/authenticate-user';
import { DeleteUserUseCase } from 'src/use-case/delete-user';
import { FindByIdUserUseCase } from 'src/use-case/find-by-id-user';
import { RegisterUserUseCase } from 'src/use-case/register-user';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Query(() => User)
  async findByUserId(@Args('id') id: string) {
    const { user } = await this.findByIdUserUseCase.execute({ id });
    return user;
  }

  @Query(() => User)
  async authenticateUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const { user } = await this.authenticateUserUseCase.execute({
      email,
      password,
    });
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { user } = await this.registerUserUseCase.execute(createUserInput);
    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: string): Promise<string> {
    const { message } = await this.deleteUserUseCase.execute({ id });
    return message;
  }
}
