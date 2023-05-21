import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { FoursquareAPI } from '../api/foursquare';
import { OpencageAPI } from '../api/opencage';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, FoursquareAPI, OpencageAPI],
})
export class PlacesModule {}
