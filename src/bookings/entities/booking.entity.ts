import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Event } from '../../events/entities/event.entity';

export enum BookingStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: false })
  customerId!: number;

  @Column({ type: 'int', nullable: false })
  eventId!: number;

  @Column({
    type: 'varchar',
    length: 20,
    enum: BookingStatus,
    default: BookingStatus.ACTIVE,
    nullable: false,
  })
  status!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Event, (event) => event.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event!: Event;
}