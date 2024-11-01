import { Injectable } from '@angular/core';
import { Power } from '../models/power.model';
import { MOCK_POWERS } from '../mocks/mock-powers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PowerService {
  private powers: Power[] = MOCK_POWERS;

  constructor() {}

  /**
   * Obtener todos los poderes.
   */
  getPowers(): Observable<Power[]> {
    return of(this.powers);
  }

  /**
   * Obtener poderes por una lista de IDs.
   * @param ids Array de identificadores de poderes.
   */
  getPowersByIds(ids: number[]): Observable<Power[]> {
    const teams = this.powers.filter((p) => ids.includes(p.id));
    return of(teams);
  }
  /**
   * Buscar poderes por nombre.
   * @param term Término de búsqueda.
   */
  searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      return of([]);
    }
    const results = this.powers.filter(
      (power) =>
        power.name.toLowerCase().includes(term.toLowerCase()) ||
        power.description.toLowerCase().includes(term.toLowerCase())
    );
    return of(results);
  }
}