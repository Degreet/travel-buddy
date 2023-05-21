import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { FoursquareAPI } from '../api/foursquare';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, FoursquareAPI],
})
export class PlacesModule {}
