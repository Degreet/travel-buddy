import { Controller, Get, NotAcceptableException, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async some(@Query('q') query?: string) {
    if (!query) throw new NotAcceptableException();
    return await this.placesService.search(query);
  }
}
