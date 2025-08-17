import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './database/configuration';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que la configuración esté disponible globalmente
      envFilePath: `.env`, // Ruta al archivo de variables de entorno
      validationSchema: validationSchema, // Validación de las variables de entorno
      load: [databaseConfig],
      validationOptions: {
        abortEarly: true, // Detenerse en el primer error de validación
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
