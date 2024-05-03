import { Field, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

@ObjectType()
export class User {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
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
