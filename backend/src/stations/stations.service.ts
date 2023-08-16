import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StationsRepository } from './stations.repositoy';
import { StationsDto } from './stations.dto';

@Injectable()
export class StationsService {
  constructor(private stationsRepository: StationsRepository) {}

  /**
   * Get all stations
   * @returns {Observable<StationsDto[]>} The stations
   * @description
   * This API call permit to get all stations.
   */
  getAllStations(): Observable<StationsDto[]> {
    return this.stationsRepository.getAllStations();
  }
}
