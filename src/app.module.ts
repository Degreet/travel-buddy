import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from './places/places.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [path.join(__dirname, '**', '*.migration.{ts,js}')],
      synchronize: true,
    }),
    PlacesModule,
    UsersModule,
    AuthModule,
    TripsModule,
  ],
})
export class AppModule {}
