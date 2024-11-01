import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsUrl = 'api/teams';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}


  /**
   * Obtener todos los equipos.
   */
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        tap(_ => console.log('fetched teams')),
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }


  /**
   * Obtener equipos por una lista de IDs.
   * @param ids Array de identificadores de equipos.
   */
  getTeamsByIds(ids: number[]): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl).pipe(
      map((teams) => teams.filter((team) => ids.includes(team.id))),
      catchError(this.handleError<Team[]>('getTeamsByIds', []))
    );
  }


  /**
   * Buscar equipos por nombre.
   * @param term Término de búsqueda.
   */

  searchTeams(term: string): Observable<Team[]> {
    if (!term.trim()) {
      // Si el término está vacío, devuelve un array vacío.
      return of([]);
    }
    return this.http.get<Team[]>(this.teamsUrl).pipe(
      map((powers) =>
        powers.filter(
          (power) =>
            power.name.toLowerCase().includes(term.toLowerCase())
        )
      ),
      catchError(this.handleError<Team[]>('searchTeams', []))
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