import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;

@Column({ type: 'text', nullable: true })
  address?: string;

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings!: Booking[];
}