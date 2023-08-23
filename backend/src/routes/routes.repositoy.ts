import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Query } from 'pg';
import { DatabaseService } from '../utils/database/database.service';
import { RoutesDto } from './routes.dto';

@Injectable()
export class RoutesRepository {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Get all routes
   * @returns {Observable<RoutesDto[]>}
   * @name searchRoutes
   * @description
   * This request permit to get all routes.
   */
  getAllRoutes(): Observable<RoutesDto[]> {
    const query: Query = {
      name: 'get-all-routes',
      text: `SELECT
                 id,
                 short_name AS "shortName",
                 long_name AS "longName",
                 color,
                 type
             FROM gotan.routes
             ORDER BY short_name`,
    };

    return this.databaseService.all<RoutesDto>(query);
  }
}
