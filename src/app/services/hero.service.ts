import { Injectable } from '@angular/core';
import { BaseHero } from '../models/hero.model';
import { MOCK_HEROES } from '../mocks/mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: BaseHero[] = MOCK_HEROES;

  constructor() {}

  /**
   * Obtener todos los héroes.
   */
  getHeroes(): Observable<BaseHero[]> {
    return of(this.heroes).pipe(
      delay(500), // Simula un retraso de red
      tap(() => console.log('Héroes obtenidos')),
      catchError(this.handleError<BaseHero[]>('getHeroes', []))
    );
  }

  /**
   * Obtener un héroe por su ID.
   * @param id Identificador del héroe.
   */
  getHero(id: number): Observable<BaseHero | undefined> {
    const hero = this.heroes.find((h) => h.id === id);
    return of(hero).pipe(
      delay(300),
      tap(() => console.log(`Héroe obtenido id=${id}`)),
      catchError(this.handleError<BaseHero>(`getHero id=${id}`))
    );
  }

  /**
   * Buscar héroes por nombre o alias.
   * @param term Término de búsqueda.
   */
  searchHeroes(term: string): Observable<BaseHero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const results = this.heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(term.toLowerCase()) ||
        (hero.alias && hero.alias.toLowerCase().includes(term.toLowerCase()))
    );
    return of(results).pipe(
      delay(400),
      tap((x) =>
        x.length
          ? console.log(`Héroes encontrados matching "${term}"`)
          : console.log(`No se encontraron héroes matching "${term}"`)
      ),
      catchError(this.handleError<BaseHero[]>('searchHeroes', []))
    );
  }

  /**
   * Manejo de errores genérico.
   * @param operation Nombre de la operación.
   * @param result Resultado por defecto.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Aquí podrías implementar lógica adicional, como notificaciones al usuario
      return of(result as T);
    };
  }
}