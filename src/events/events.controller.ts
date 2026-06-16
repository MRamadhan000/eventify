import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { BaseResponseDto } from '../common/dto/base-responsee';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) { }

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<BaseResponseDto<Event>> {
    const event = await this.eventsService.create(
      createEventDto,
    );

    return BaseResponseDto.success(
      'Event berhasil dibuat',
      event,
    );
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<Event[]>> {
    const events = await this.eventsService.findAll();

    return BaseResponseDto.success(
      'Data event berhasil diambil',
      events,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseDto<Event>> {
    const event = await this.eventsService.findOne(id);

    return BaseResponseDto.success(
      'Detail event berhasil diambil',
      event,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<BaseResponseDto<Event>> {
    const event = await this.eventsService.update(
      id,
      updateEventDto,
    );

    return BaseResponseDto.success(
      'Event berhasil diperbarui',
      event,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseDto<Event>> {
    const event = await this.eventsService.remove(id);

    return BaseResponseDto.success(
      'Event berhasil dihapus',
      event,
    );
  }
}