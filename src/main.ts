import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : ['error','warn','log']
  });

  const logger = new Logger('Bootsrap')

  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    logger.log('✅ PostgreSQL connected successfully')
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();