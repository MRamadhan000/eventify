import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { name, email, password } = createAdminDto;

    const emailExist = await this.adminRepository.findOne({ where: { email } });
    if (emailExist) {
      throw new ConflictException('Email sudah digunakan oleh admin lain');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = this.adminRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return await this.adminRepository.save(newAdmin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin dengan ID #${id} tidak ditemukan`);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);

    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt();
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, salt);
    }

    const updatedAdmin = this.adminRepository.merge(admin, updateAdminDto);

    return await this.adminRepository.save(updatedAdmin);
  }

  async remove(id: number): Promise<Admin> {
    const admin = await this.findOne(id);

    return await this.adminRepository.remove(admin);
  }
}