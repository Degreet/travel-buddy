import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get(':near')
  async some(@Param() near: string, @Query('q') query?: string) {
    return await this.placesService.search(near, query);
  }
}
