import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { SearchQueryDto } from './dto/search.query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async search(@Query() searchQueryDto: SearchQueryDto) {
    return await this.placesService.search(searchQueryDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.placesService.getPlaceById(id);
  }
}
