import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Query } from 'pg';
import { DatabaseService } from '../utils/database/database.service';
import { GeoJsonResult } from './layers.dto';
import { SearchLayersPayload } from './search.layers.payload';

@Injectable()
export class LayersRepository {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Search layers
   * @param payload
   * @returns {Observable<GeoJsonResult>}
   * @name searchLayers
   * @description
   * This request permit to search stops and routes with different filter and return a geojson.
   */
  searchLayers(payload: SearchLayersPayload): Observable<GeoJsonResult> {
    const query: Query = {
      name: 'search-layers',
      text: `SELECT gotan.get_layers($1, $2) as geojson;`,
      values: [payload.stationId, payload.routeId],
    };

    return this.databaseService.one<GeoJsonResult>(query);
  }
}
