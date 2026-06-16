import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp', nullable: false })
  date!: Date;

  @Column({ type: 'int', nullable: false })
  quota!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];
}