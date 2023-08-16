import { Inject, Injectable } from '@nestjs/common';
import { Pool, Result, Query } from 'pg';
import { PG_CONNECTION } from './database.constant';
import { from, Observable, throwError, throwIfEmpty } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { TechnicalException } from '../exception/technical.exception';
import { NotFoundException } from '../exception/not-found.exception';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(PG_CONNECTION)
    private readonly dbConnection: Pool,
  ) {}

  /**
   * Execute a database query and return the first result or a NotFound exception as an observable.
   * @param query The query to execute
   * @returns An observable that emits the first query result
   */
  one<T>(query: Query): Observable<T> {
    return from(this.dbConnection.query(query)).pipe(
      // Catch any errors that occur during the query and throw a technical exception
      catchError((err) =>
        throwError(() => new TechnicalException(err.message)),
      ),
      // Filter out any results that don't have any rows
      filter((result: Result) => result.rows.length > 0),
      // Throw a not found exception if no results are found
      throwIfEmpty(() => new NotFoundException()),
      // Map the result to the first row and return it
      map((result: Result) => result.rows[0] as T),
    );
  }

  /**
   * Execute a database query and return all results as an observable array.
   * @param query The query to execute
   * @returns An observable that emits an array of all query results
   */
  all<T>(query): Observable<T[]> {
    return from(this.dbConnection.query(query)).pipe(
      // Catch any errors that occur during the query and throw a technical exception
      catchError((err) =>
        throwError(() => new TechnicalException(err.message)),
      ),
      // Map the result to the rows array and return it
      map((result: Result) => result.rows as T[]),
    );
  }
}
