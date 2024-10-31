import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { MOCK_TEAMS } from '../mocks/mock-teams';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teams: Team[] = MOCK_TEAMS;

  constructor() {}

  /**
   * Obtener todos los equipos.
   */
  getTeams(): Observable<Team[]> {
    return of(this.teams);
  }

  /**
   * Obtener un equipo por su ID.
   * @param id Identificador del equipo.
   */
  getTeamById(id: number): Observable<Team | undefined> {
    const team = this.teams.find((t) => t.id === id);
    return of(team);
  }

  /**
   * Obtener equipos por una lista de IDs.
   * @param ids Array de identificadores de equipos.
   */
  getTeamsByIds(ids: number[]): Observable<Team[]> {
    const teams = this.teams.filter((t) => ids.includes(t.id));
    return of(teams);
  }

  /**
   * Buscar equipos por nombre.
   * @param term Término de búsqueda.
   */
  searchTeams(term: string): Observable<Team[]> {
    if (!term.trim()) {
      return of([]);
    }
    const results = this.teams.filter(
      (team) =>
        team.name.toLowerCase().includes(term.toLowerCase()));
    return of(results);
  }
}