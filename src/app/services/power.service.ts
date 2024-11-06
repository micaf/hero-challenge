import { Injectable } from '@angular/core';
import { Power } from '../models/power.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PowerService {
  private powerUrl = 'api/powers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powerUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  /**
   * @param ids 
   */
  getPowersByIds(ids: number[]): Observable<Power[]> {
    return this.http.get<Power[]>(this.powerUrl).pipe(
      map((powers) => powers.filter((power) => ids.includes(power.id))),
      catchError(this.handleError<Power[]>('getPowersByIds', []))
    );
  }
  
  /**
   * @param term 
   */
  searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Power[]>(this.powerUrl).pipe(
      map((powers) =>
        powers.filter(
          (power) =>
            power.name.toLowerCase().includes(term.toLowerCase()) ||
            power.description.toLowerCase().includes(term.toLowerCase())
        )
      ),
      catchError(this.handleError<Power[]>('searchPowers', []))
    );
  }

  /**
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}