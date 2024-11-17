import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Employee } from '../employee/employee.entity';
import { JwtStrategy } from 'src/services/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecretkey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
