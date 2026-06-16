import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) { }
  
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const existingEvent = await this.eventRepository.findOne({
      where: {
        title: createEventDto.title,
      },
    });

    if (existingEvent) {
      throw new ConflictException(
        'Event dengan judul tersebut sudah ada',
      );
    }

    return this.eventRepository.save(
      this.eventRepository.create(createEventDto),
    );
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      order: {
        date: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event dengan ID #${id} tidak ditemukan`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    const updatedEvent = this.eventRepository.merge(event, updateEventDto);

    return await this.eventRepository.save(updatedEvent);
  }

  async remove(id: number): Promise<Event> {
    const event = await this.findOne(id);

    return await this.eventRepository.remove(event);
  }
}