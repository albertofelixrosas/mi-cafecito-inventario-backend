import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './database.provider';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class DatabaseModule {}
