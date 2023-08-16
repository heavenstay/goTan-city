import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { StationsService } from './stations.service';
import { StationsDto } from './stations.dto';

@Controller('/api/stations')
@ApiTags('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all stations',
    description: 'This API call permit to get all stations.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'It should a return all stations.',
  })
  getAllStations(): Observable<StationsDto[]> {
    return this.stationsService.getAllStations();
  }
}
