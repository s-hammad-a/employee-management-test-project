import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  age: number;

  @Field()
  @Column()
  class: string;

  @Field(() => [String])
  @Column('simple-array')
  subjects: string[];

  @Field()
  @Column()
  attendance: number;

  @Field()
  @Column({ default: 'employee' })
  role: string;

  @Column()
  password: string;
}
