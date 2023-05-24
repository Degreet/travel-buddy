import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { MakeRecordDto } from './dto/make-record.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  async makeRecord(makeRecordDto: MakeRecordDto, user: User) {
    const trip = new Trip();
    trip.longitude = makeRecordDto.longitude;
    trip.latitude = makeRecordDto.latitude;
    trip.traveler = user;
    return await this.tripsRepository.save(trip);
  }

  async myTrips(user: User) {
    const userWithTrips = await this.usersService.findByEmail(user.email, true);
    return userWithTrips.trips;
  }
}
