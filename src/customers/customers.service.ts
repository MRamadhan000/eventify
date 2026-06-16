import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, email, password, address } = createCustomerDto;

    const emailExist = await this.customerRepository.findOne({ where: { email } });
    if (emailExist) {
      throw new ConflictException('Email sudah digunakan oleh customer lain');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = this.customerRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
    });

    return await this.customerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer dengan ID #${id} tidak ditemukan`);
    }

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    if (updateCustomerDto.password) {
      const salt = await bcrypt.genSalt();
      updateCustomerDto.password = await bcrypt.hash(updateCustomerDto.password, salt);
    }

    const updatedCustomer = this.customerRepository.merge(customer, updateCustomerDto);

    return await this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);

    return await this.customerRepository.remove(customer);
  }
}