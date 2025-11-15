import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Geo Info Service')
    .setDescription('API for geographical information of Colombia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use('/openapi.json', (req: Request, res: Response) => res.json(document));

  await app.listen(process.env.PORT ?? 3000);
}
// mark the returned promise as intentionally ignored to satisfy the
// @typescript-eslint/no-floating-promises rule (we don't need to await here)
void bootstrap();
