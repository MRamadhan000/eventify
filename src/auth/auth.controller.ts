// auth.controller.ts

import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BaseResponseDto } from '../common/dto/base-responsee';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return BaseResponseDto.success('Registrasi berhasil', result);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return BaseResponseDto.success('Login berhasil', result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  async getProfile(@Request() req: any) {
    const customerId = req.user.id;

    const result = await this.authService.getProfile(customerId);

    return BaseResponseDto.success(
      'Berhasil mengambil data profil',
      result,
    );
  }
}
