import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesApi } from './api/places.api';
import { Client } from '@googlemaps/google-maps-services-js';

@Module({
  controllers: [PlacesController],
  providers: [
    PlacesService,
    {
      provide: PlacesApi.name,
      useFactory: (client: Client) => new PlacesApi(client),
      inject: [Client],
    },
    Client,
  ],
})
export class PlacesModule {}
