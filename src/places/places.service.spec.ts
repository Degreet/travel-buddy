import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesApi } from './api/places.api';
import { Client, PlaceType1 } from '@googlemaps/google-maps-services-js';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Place } from './interfaces/place.interface';
import { SearchQueryDto } from './dto/search.query.dto';

describe('PlacesController', () => {
  let placesService: PlacesService;
  let places: Place[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlacesController],
      imports: [ConfigModule.forRoot()],
      providers: [
        PlacesService,
        {
          provide: PlacesApi.name,
          useFactory: (client: Client) => new PlacesApi(client),
          inject: [Client],
        },
        Client,
      ],
    }).compile();

    placesService = moduleRef.get<PlacesService>(PlacesService);
  });

  describe('search', () => {
    it('Find Ukraine interesting places', async () => {
      const dto = new SearchQueryDto();
      dto.country = 'ukraine';
      places = await placesService.search(dto);

      expect(places).toBeDefined();
      expect(places.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('search near', () => {
    it('Search cafe near found place', async () => {
      const dto = new SearchQueryDto();
      dto.type = PlaceType1.cafe;
      dto.location = places[0].geocode;

      const nearPlaces = await placesService.search(dto);
      expect(nearPlaces).toBeDefined();
      expect(nearPlaces.length).toBeGreaterThanOrEqual(1);
    });
  });
});
