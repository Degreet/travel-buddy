import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesApi } from './api/places.api';
import { Client } from '@googlemaps/google-maps-services-js';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Place } from './interfaces/place.interface';

describe('PlacesController', () => {
  let placesService: PlacesService;
  let places: Place[];

  beforeEach(async () => {
    placesService = new PlacesService(new PlacesApi(new Client()));
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
    places = await placesService.search('ukraine');
  });

  describe('search', () => {
    it('Find Ukraine interesting places', async () => {
      expect(places).toBeDefined();
      expect(places.length).toBeGreaterThanOrEqual(5);
    });
  });
});
