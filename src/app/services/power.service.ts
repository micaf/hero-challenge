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

  /**
   * Obtener todos los poderes.
   */
  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powerUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  /**
   * Obtener poderes por una lista de IDs.
   * @param ids Array de identificadores de poderes.
   */
  getPowersByIds(ids: number[]): Observable<Power[]> {
    return this.http.get<Power[]>(this.powerUrl).pipe(
      map((powers) => powers.filter((power) => ids.includes(power.id))),
      catchError(this.handleError<Power[]>('getPowersByIds', []))
    );
  }
  
  /**
   * Buscar poderes por nombre.
   * @param term Término de búsqueda.
   */
  searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      // Si el término está vacío, devuelve un array vacío.
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
   * Manejo de errores.
   * @param operation Operación donde ocurrió el error.
   * @param result Resultado opcional para devolver en caso de error.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}