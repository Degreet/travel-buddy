import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { MakeRecordDto } from './dto/make-record.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}

  async makeRecord(makeRecordDto: MakeRecordDto, user: User) {
    const trip = new Trip();
    trip.longitude = makeRecordDto.longitude;
    trip.latitude = makeRecordDto.latitude;
    trip.traveler = user;
    return await this.tripRepository.save(trip);
  }
}
