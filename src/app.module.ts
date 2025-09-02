import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './database/configuration';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { StockEntriesModule } from './stock-entries/stock-entries.module';
import { StockWithdrawalsModule } from './stock-withdrawals/stock-withdrawals.module';
import { StockLossesModule } from './stock-losses/stock-losses.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { UsersModule } from './users/users.module';

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
    ProductsModule,
    ProductCategoriesModule,
    StockEntriesModule,
    StockWithdrawalsModule,
    StockLossesModule,
    WarehousesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
