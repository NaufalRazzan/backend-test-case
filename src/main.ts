import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import { HttpExceptionFilter } from './application/exception/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter)

  if(process.env.NODE_ENV === 'devs'){
    const swaggerConfig = new DocumentBuilder()
    .setTitle('Backend Test API')
    .setDescription('API untuk technical test sebagai developer backend')
    .addTag('Oleh Naufal Afthar Razzan')
    .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)

    SwaggerModule.setup('api', app, document)
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
