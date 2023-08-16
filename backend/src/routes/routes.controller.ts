import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { RoutesService } from './routes.service';
import { RoutesDto } from './routes.dto';

@Controller('/api/routes')
@ApiTags('routes')
export class RoutesController {
  constructor(private readonly stationService: RoutesService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all routes',
    description: 'This API call permit to get all routes.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'It should a return all routes.',
  })
  getAllRoutes(): Observable<RoutesDto[]> {
    return this.stationService.getAllRoutes();
  }
}
