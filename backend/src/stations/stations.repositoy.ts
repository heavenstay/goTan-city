import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Query } from 'pg';
import { DatabaseService } from '../utils/database/database.service';
import { StationsDto } from './stations.dto';

@Injectable()
export class StationsRepository {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Gat all stations
   * @returns {Observable<StationsDto[]>}
   * @name getAllStations
   * @description
   * This request permit to get all stations.
   */
  getAllStations(): Observable<StationsDto[]> {
    const query: Query = {
      name: 'get-all-stations',
      text: `SELECT
                 id,
                 name,
                 gotan.ST_Y(coordinates) AS latitude,
                 gotan.ST_X(coordinates) AS longitude
             FROM gotan.stations
             ORDER BY name`,
    };

    return this.databaseService.all<StationsDto>(query);
  }
}
