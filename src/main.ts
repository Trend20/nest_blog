import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix(process.env.APP_API_PREFIX);
  setupSwagger(app);
  const port = process.env.SERVER_PORT;
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
