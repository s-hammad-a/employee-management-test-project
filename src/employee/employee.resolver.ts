import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/services/roles.guard';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee])
  @UseGuards(AuthGuard)
  async listEmployees(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ): Promise<Employee[]> {
    return await this.employeeService.findAll(skip, take, search);
  }

  @Query(() => Employee)
  @UseGuards(AuthGuard)
  async getEmployee(@Args('id', { type: () => Int }) id: number): Promise<Employee> {
    return await this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  @UseGuards(AuthGuard, new RolesGuard(['admin']))
  async addEmployee(
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
    @Args('class') className: string,
    @Args('subjects', { type: () => [String] }) subjects: string[],
    @Args('attendance', { type: () => Int }) attendance: number,
    @Args('password') password: string,
  ): Promise<Employee> {
    return await this.employeeService.create({ name, age, class: className, subjects, attendance, password });
  }

  @Mutation(() => Employee)
  @UseGuards(AuthGuard, new RolesGuard(['admin']))
  async updateEmployee(
    @Args('id', { type: () => Int }) id: number,
    @Args('attendance', { type: () => Int }) attendance: number,
  ): Promise<Employee> {
    return await this.employeeService.update(id, attendance);
  }
}
