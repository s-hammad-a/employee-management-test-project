import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  class: string;

  @Field(() => [String])
  subjects: string[];

  @Field(() => Int)
  attendance: number;

  @Field()
  password: string;

  @Field({ defaultValue: 'employee' })
  role: string;
}
