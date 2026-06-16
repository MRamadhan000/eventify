import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BaseResponseDto } from '../common/dto/base-responsee';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard';       
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

@Post()
  @Roles(Role.CUSTOMER)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req: any, 
  ): Promise<BaseResponseDto<any>> {
    const customerId = req.user.id; 

    const booking = await this.bookingsService.create(customerId, createBookingDto);

    return BaseResponseDto.success(
      'Booking berhasil dibuat',
      booking,
    );
  }

  @Get()
  @Roles(Role.ADMIN) 
  async findAll(): Promise<BaseResponseDto<any>> {
    const bookings = await this.bookingsService.findAll();

    return BaseResponseDto.success(
      'Data booking berhasil diambil',
      bookings,
    );
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseDto<any>> {
    const booking = await this.bookingsService.findOne(id);

    return BaseResponseDto.success(
      'Detail booking berhasil diambil',
      booking,
    );
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<BaseResponseDto<any>> {
    const booking = await this.bookingsService.update(id, updateBookingDto);

    return BaseResponseDto.success(
      'Booking berhasil diperbarui',
      booking,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER) 
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseDto<any>> {
    const booking = await this.bookingsService.remove(id);

    return BaseResponseDto.success(
      'Booking berhasil dihapus',
      booking,
    );
  }
}