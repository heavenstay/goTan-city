import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoutesRepository } from './routes.repositoy';
import { RoutesDto } from './routes.dto';

@Injectable()
export class RoutesService {
  constructor(private routesRepository: RoutesRepository) {}

  /**
   * Get all routes
   * @returns {Observable<RoutesDto[]>} The routes
   * @description
   * This API call permit to get all routes.
   */
  getAllRoutes(): Observable<RoutesDto[]> {
    return this.routesRepository.getAllRoutes();
  }
}
