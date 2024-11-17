import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(skip = 0, take = 10, search?: string): Promise<Employee[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');
    if (search) query.where('employee.name ILIKE :search', { search: `%${search}%` });
    return await query.skip(skip).take(take).getMany();
  }

  async findOne(id: number): Promise<Employee> {
    return await this.employeeRepository.findOneBy({ id });
  }

  async create(data: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(data);
    return await this.employeeRepository.save(employee);
  }

  async update(id: number, attendance: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) throw new Error('Employee not found');

    employee.attendance = attendance;
    return await this.employeeRepository.save(employee);
  }
}
