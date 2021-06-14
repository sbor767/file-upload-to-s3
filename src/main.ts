import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Upload file to AWS S3')
      .setDescription('"Upload file to AWS S3" application API')
      .setVersion('1.0')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api', app, swaggerDocument, {
      swaggerOptions: {
        tagsSorter: 'alpha',
      },
    });
  }

  const port = +process.env.APP_PORT || 3000;
  await app.listen(port);
  logger.log(`NODE_ENV=${process.env.NODE_ENV}`);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
