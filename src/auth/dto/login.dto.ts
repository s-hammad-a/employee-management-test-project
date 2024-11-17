import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  name: string;

  @Field()
  password: string;
}
