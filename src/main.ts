import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  console.log(`FRONTEND_URL: ${configService.get<string>('FRONTEND_URL')}`);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Quita propiedades no definidas en DTO
      forbidNonWhitelisted: true, // Lanza error si vienen propiedades no permitidas
      forbidUnknownValues: true, // Asegura que los objetos no sean null o undefined
      transform: true, // Convierte tipos automáticamente (por ejemplo, de string a number)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mi Cafecito API')
    .setDescription('Documentación de la API de Mi Cafecito')
    .setVersion('1.0')
    // .addBearerAuth() // opcional: si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const choosedTheme: SwaggerThemeNameEnum = SwaggerThemeNameEnum.ONE_DARK;

  const theme = new SwaggerTheme();
  const darkTheme = theme.getBuffer(choosedTheme);

  SwaggerModule.setup('api', app, document, {
    customCss: darkTheme,
  });

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();
