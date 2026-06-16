process.env.JWT_SECRET = 'super-secret-key';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';

jest.mock('@nestjs/typeorm', () => {
  const original = jest.requireActual('@nestjs/typeorm');
  return {
    ...original,
    TypeOrmModule: {
      forRoot: () => ({
        module: class {},
      }),
      forRootAsync: () => ({
        module: class {},
      }),
      forFeature: (entities: any[]) => {
        const providers = entities.map((entity) => ({
          provide: original.getRepositoryToken(entity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
          },
        }));
        return {
          module: class {},
          providers,
          exports: providers,
        };
      },
    },
  };
});

import { AppModule } from '../src/app.module';
import { BookingsService } from '../src/bookings/bookings.service';
import { Role } from '../src/auth/enum/role.enum';

describe('Bookings API Token (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  const mockBookingsService = {
    create: jest.fn().mockResolvedValue({ id: 1, customerId: 1, eventId: 1, status: 'ACTIVE' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, customerId: 1, eventId: 1, status: 'ACTIVE' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, customerId: 1, eventId: 1, status: 'ACTIVE' }),
    update: jest.fn().mockResolvedValue({ id: 1, customerId: 1, eventId: 1, status: 'ACTIVE' }),
    remove: jest.fn().mockResolvedValue({ id: 1, customerId: 1, eventId: 1, status: 'ACTIVE' }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BookingsService)
      .useValue(mockBookingsService)
      .compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe());
    
    await app.init();

    jwtService = app.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  const generateToken = (userId: number, email: string, role: Role) => {
    const payload = {
      sub: userId,
      email,
      role,
    };
    return jwtService.sign(payload);
  };

  describe('Authentication - Access without token or invalid token', () => {
    it('GET /bookings - should fail (401) if no token is provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/bookings')
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toBe('Unauthorized');
    });

    it('GET /bookings - should fail (401) if invalid token is provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', 'Bearer invalid-token-value')
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toBe('Unauthorized');
    });

    it('POST /bookings - should fail (401) if no token is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send({ eventId: 1 })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('Authorization - Access with wrong roles', () => {
    it('GET /bookings (Admin Only) - should fail (403) for CUSTOMER role', async () => {
      const customerToken = generateToken(1, 'customer@example.com', Role.CUSTOMER);

      const response = await request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toContain('Akses ditolak');
    });

    it('POST /bookings (Customer Only) - should fail (403) for ADMIN role', async () => {
      const adminToken = generateToken(2, 'admin@example.com', Role.ADMIN);

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ eventId: 1 })
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body.message).toContain('Akses ditolak');
    });
  });

  describe('Successful Access - Access with valid token and correct roles', () => {
    it('POST /bookings - should succeed (201) with CUSTOMER token', async () => {
      const customerToken = generateToken(1, 'customer@example.com', Role.CUSTOMER);

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ eventId: 1 })
        .expect(HttpStatus.CREATED);

      expect(response.body.message).toBe('Booking berhasil dibuat');
      expect(response.body.data).toBeDefined();
      expect(mockBookingsService.create).toHaveBeenCalled();
    });

    it('GET /bookings - should succeed (200) with ADMIN token', async () => {
      const adminToken = generateToken(2, 'admin@example.com', Role.ADMIN);

      const response = await request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.message).toBe('Data booking berhasil diambil');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(mockBookingsService.findAll).toHaveBeenCalled();
    });

    it('GET /bookings/:id - should succeed (200) with CUSTOMER token', async () => {
      const customerToken = generateToken(1, 'customer@example.com', Role.CUSTOMER);

      const response = await request(app.getHttpServer())
        .get('/bookings/1')
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.message).toBe('Detail booking berhasil diambil');
      expect(mockBookingsService.findOne).toHaveBeenCalledWith(1);
    });

    it('PATCH /bookings/:id - should succeed (200) with CUSTOMER token', async () => {
      const customerToken = generateToken(1, 'customer@example.com', Role.CUSTOMER);

      const response = await request(app.getHttpServer())
        .patch('/bookings/1')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ status: 'CANCELLED' })
        .expect(HttpStatus.OK);

      expect(response.body.message).toBe('Booking berhasil diperbarui');
      expect(mockBookingsService.update).toHaveBeenCalledWith(1, { status: 'CANCELLED' });
    });

    it('DELETE /bookings/:id - should succeed (200) with CUSTOMER token', async () => {
      const customerToken = generateToken(1, 'customer@example.com', Role.CUSTOMER);

      const response = await request(app.getHttpServer())
        .delete('/bookings/1')
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.message).toBe('Booking berhasil dihapus');
      expect(mockBookingsService.remove).toHaveBeenCalledWith(1);
    });
  });
});