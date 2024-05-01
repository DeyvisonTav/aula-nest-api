import { UserMemoryRepository } from '../repositories/in-memory/user-memory-repository';
import { RegisterUserUseCase } from './register-user';
import { compare } from 'bcrypt';

let inMemoryRepository: UserMemoryRepository;
let useCase: RegisterUserUseCase;

describe('RegisterUserUseCase', () => {
  beforeEach(() => {
    inMemoryRepository = new UserMemoryRepository();
    useCase = new RegisterUserUseCase(inMemoryRepository);
  });

  it('should be able to register a user', async () => {
    const { user } = await useCase.execute({
      name: 'John Doe',
      email: 'yj5OJ@example.com',
      password: '123456',
    });

    expect(user.id).toBeDefined();
    expect(user.email).toEqual('yj5OJ@example.com');
    expect(user.name).toEqual('John Doe');
    expect(await compare('123456', user.password)).toBeTruthy();
  });

  it('should not be able to register a user with an existing email', async () => {
    await useCase.execute({
      name: 'John Doe',
      email: 'yj5OJ@example.com',
      password: '123456',
    });

    await expect(
      useCase.execute({
        name: 'Joana Doe',
        email: 'yj5OJ@example.com',
        password: '12345690812',
      }),
    ).rejects.toThrowError(new Error('User already exists'));
  });
});
