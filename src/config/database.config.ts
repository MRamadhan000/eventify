import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),

        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: true,

        logging: ['error'],
    }),
};