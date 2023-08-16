import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayersRepository } from './layers.repositoy';
import { SearchLayersPayload } from './search.layers.payload';
import { GeoJsonResult, LayersDto } from './layers.dto';

@Injectable()
export class LayersService {
  constructor(private layerRepository: LayersRepository) {}

  /**
   * Search layers
   * @param payload {SearchLayersPayload} The payload to search layers
   * @returns {Observable<LayersDto>} The Layers
   * @description
   * This API call permit to search stops and routes with by routeId and stationId and return a geojson.
   */
  getLayers(payload: SearchLayersPayload): Observable<LayersDto> {
    return this.layerRepository.searchLayers(payload).pipe(
      map((geojsonResult: GeoJsonResult) => {
        return geojsonResult.geojson;
      }),
    );
  }
}
