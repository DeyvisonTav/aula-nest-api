import { randomUUID } from 'crypto';

export class User {
  id?: string;
  email: string;
  name: string;
  password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static save(name: string, email: string, password: string) {
    return new User(name, email, password);
  }
}
