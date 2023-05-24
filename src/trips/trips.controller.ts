import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { MakeRecordDto } from './dto/make-record.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('trips')
@UseGuards(AuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('record')
  async recordTrip(
    @Body() makeRecordDto: MakeRecordDto,
    @Req() request: Request,
  ) {
    await this.tripsService.makeRecord(makeRecordDto, request['user']);
  }

  @Get('my')
  async myTrips(@Req() request: Request) {
    return await this.tripsService.myTrips(request['user']);
  }
}
