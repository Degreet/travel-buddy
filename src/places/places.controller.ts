import {
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Query,
} from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async search(@Query('q') query?: string) {
    if (!query) throw new NotAcceptableException();
    return await this.placesService.search(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.placesService.getPlaceById(id);
  }
}
