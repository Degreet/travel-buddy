import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Client } from '@googlemaps/google-maps-services-js';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, Client],
})
export class PlacesModule {}
