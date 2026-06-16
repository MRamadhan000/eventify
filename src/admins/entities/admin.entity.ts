import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;
}