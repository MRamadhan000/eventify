import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BaseResponseDto } from '../common/dto/base-responsee';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    const result = await this.authService.register(registerDto);

    return BaseResponseDto.success(
      'Registrasi berhasil',
      result,
    );
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const result = await this.authService.login(loginDto);

    return BaseResponseDto.success(
      'Login berhasil',
      result,
    );
  }
}