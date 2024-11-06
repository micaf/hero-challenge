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
   * @param pageIndex 
   * @param pageSize 
   */
  getHeroes(pageIndex: number = 0, pageSize: number = 5): Observable<BaseHero[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<BaseHero[]>(this.heroesUrl);
  }

  /**
   * @param id Hero ID
   */
  getHero(id: number): Observable<BaseHero | undefined> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<BaseHero>(url).pipe(
      delay(300),
      tap(() => console.log('getHero') ),
      catchError(this.handleError<BaseHero>(`getHero id=${id}`))
    );
  }


  /**
     * @param term Search term
     */
  searchHeroes(term: string): Observable<BaseHero[]> {
    if (!term.trim()) {
      return of([]);
    }

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


  addHero(hero: BaseHero): Observable<BaseHero> {
    return this.http.post<BaseHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: BaseHero) => console.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<BaseHero>('addHero'))
    );
  }


  deleteHero(id: number): Observable<BaseHero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<BaseHero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<BaseHero>('deleteHero'))
    );
  }

  updateHero(hero: BaseHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
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