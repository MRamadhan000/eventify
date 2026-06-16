import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { CustomersService } from '../customers/customers.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly customersService: CustomersService,
    private readonly eventsService: EventsService,
  ) {}

  // 1. CREATE BOOKING
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { customerId, eventId, status } = createBookingDto;

    // Memastikan Customer dan Event benar-benar ada di database
    // Jika tidak ada, method findOne dari service masing-masing otomatis melempar NotFoundException
    await this.customersService.findOne(customerId);
    const event = await this.eventsService.findOne(eventId);

    // Hitung berapa banyak booking yang berstatus 'ACTIVE' pada event ini
    const activeBookingsCount = await this.bookingRepository.count({
      where: { eventId, status: BookingStatus.ACTIVE },
    });

    // Validasi aturan bisnis: Bandingkan dengan total kuota event
    if (activeBookingsCount >= event.quota) {
      throw new BadRequestException(`Gagal melakukan booking. Kuota untuk event "${event.title}" sudah penuh`);
    }

    // Buat instance entitas booking baru
    const newBooking = this.bookingRepository.create({
      customerId,
      eventId,
      status: status || BookingStatus.ACTIVE, // Menggunakan input DTO jika ada, jika tidak default ke ACTIVE
    });

    // Simpan data booking ke database
    return await this.bookingRepository.save(newBooking);
  }

 async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: {
        customer: true,
        event: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      // PERBAIKAN: Samakan juga format objeknya di sini
      relations: {
        customer: true,
        event: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking dengan ID #${id} tidak ditemukan`);
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    const updatedBooking = this.bookingRepository.merge(booking, updateBookingDto);

    return await this.bookingRepository.save(updatedBooking);
  }

  async remove(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    
    return await this.bookingRepository.remove(booking);
  }
}
