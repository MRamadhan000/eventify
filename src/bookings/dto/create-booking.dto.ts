import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @IsInt({ message: 'Customer ID harus berupa angka bulat' })
  @IsNotEmpty({ message: 'Customer ID wajib diisi dan tidak boleh kosong' })
  customerId!: number;

  @IsInt({ message: 'Event ID harus berupa angka bulat' })
  @IsNotEmpty({ message: 'Event ID wajib diisi dan tidak boleh kosong' })
  eventId!: number;

  @IsOptional()
  @IsEnum(BookingStatus, { message: 'Status booking harus bernilai ACTIVE atau CANCELLED' })
  status?: BookingStatus;
}