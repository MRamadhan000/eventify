import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { CustomersModule } from './customers/customers.module';
import { AdminsModule } from './admins/admins.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync(DatabaseConfig),

    EventsModule,
    BookingsModule,
    CustomersModule,
    AdminsModule,
    AuthModule,
  ],
})
export class AppModule {}