import { Injectable } from '@angular/core';
import { BaseHero } from '../models/hero.model';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * Obtener héroes desde el servidor, considerando índice de página y tamaño.
   * @param pageIndex Índice de la página.
   * @param pageSize Tamaño de la página.
   */
  getHeroes(pageIndex: number = 0, pageSize: number = 5): Observable<BaseHero[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<BaseHero[]>(this.heroesUrl);
  }

  /**
   * Obtener un héroe específico por ID.
   * @param id ID del héroe.
   */
  getHero(id: number): Observable<BaseHero | undefined> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<BaseHero>(url).pipe(
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
      // Si no hay término de búsqueda, retornar un array vacío.
      return of([]);
    }

    // Construcción de la URL para la búsqueda
    const url = `${this.heroesUrl}?name=${term}&alias=${term}`;
    return this.http.get<BaseHero[]>(url).pipe(
      delay(400),
      map((heroes) => heroes.filter(
        hero =>
          hero.name.toLowerCase().includes(term.toLowerCase()) ||
          (hero.alias && hero.alias.toLowerCase().includes(term.toLowerCase()))
      )),
      tap((x) =>
        x.length
          ? console.log(`Héroes encontrados matching "${term}"`)
          : console.log(`No se encontraron héroes matching "${term}"`)
      ),
      catchError(this.handleError<BaseHero[]>('searchHeroes', []))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: BaseHero): Observable<BaseHero> {
    return this.http.post<BaseHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: BaseHero) => console.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<BaseHero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<BaseHero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<BaseHero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<BaseHero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: BaseHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
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