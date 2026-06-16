import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateCustomer(
    email: string,
    password: string,
  ) {
    const customer =
      await this.customersService.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedException(
        'Email atau password salah',
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      customer.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Email atau password salah',
      );
    }

    return customer;
  }

  async login(loginDto: LoginDto) {
    const customer = await this.validateCustomer(
      loginDto.email,
      loginDto.password,
    );

    const payload = {
      sub: customer.id,
      email: customer.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const customer =
      await this.customersService.create(registerDto);

    // MENGEMBALIKAN DATA MENTAH SAJA
    return {
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
      },
    };
  }
}