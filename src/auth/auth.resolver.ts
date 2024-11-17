import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Employee } from '../employee/employee.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Employee)
  async register(@Args('registerInput') registerDto: RegisterDto): Promise<Employee> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => String)
  async login(@Args('loginInput') loginDto: LoginDto): Promise<string> {
    const { accessToken } = await this.authService.login(loginDto);
    return accessToken;
  }
}
