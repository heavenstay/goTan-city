import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SearchLayersPayload } from './search.layers.payload';
import { LayersService } from './layers.service';
import { LayersDto } from './layers.dto';

@Controller('/api/layers')
@ApiTags('layers')
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get layers',
    description: 'This API call permit to get layers with different filter.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'It should a return Layers on a geojson format.',
  })
  getLayers(@Query() payload: SearchLayersPayload): Observable<LayersDto> {
    return this.layersService.getLayers(payload);
  }
}
