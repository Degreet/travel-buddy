import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async search(
    @Query('query') query?: string,
    @Query('country') country?: string,
    @Query('city') city?: string,
  ) {
    return await this.placesService.search(
      [country, city, query || 'interesting'].join(),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.placesService.getPlaceById(id);
  }
}
