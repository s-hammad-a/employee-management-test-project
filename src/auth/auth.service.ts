import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employee/employee.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Employee> {
    const { name, age, class: className, subjects, attendance, password, role } = registerDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = this.employeeRepository.create({
      name,
      age,
      class: className,
      subjects,
      attendance,
      password: hashedPassword,
      role,
    });

    return await this.employeeRepository.save(employee);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { name, password } = loginDto;

    const user = await this.employeeRepository.findOneBy({ name });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.name, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(username: string): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ name: username });
  }
}
