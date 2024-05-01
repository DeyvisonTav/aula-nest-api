import { UserMemoryRepository } from '../repositories/in-memory/user-memory-repository';
import { FindByIdUserUseCase } from './find-by-id-user';
import { RegisterUserUseCase } from './register-user';

let useCase: FindByIdUserUseCase;
let createUserUseCase: RegisterUserUseCase;
let inMemoryRepository: UserMemoryRepository;

describe('FindByIdUserUseCase', () => {
  beforeEach(() => {
    inMemoryRepository = new UserMemoryRepository();
    createUserUseCase = new RegisterUserUseCase(inMemoryRepository);
    useCase = new FindByIdUserUseCase(inMemoryRepository);
  });
  it('should be able to find a user by id', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'yj5OJ@example.com',
      password: '123456',
    });

    const { user: userFound } = await useCase.execute({ id: user.id });

    expect(userFound).toEqual(user);
  });
  it('should not be able to find a user that does not exist', async () => {
    await expect(useCase.execute({ id: 'invalid-id' })).rejects.toThrow(
      'User not found',
    );
  });
});
