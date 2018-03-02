/** generated using ng generate service */

import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

//Observable imports
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// for HTTP client calls
import { HttpClient, HttpHeaders } from '@angular/common/http';

// error handling
import { catchError, map, tap } from 'rxjs/operators';

/*
The heroes web API expects a special header in HTTP save requests.
 That header is in the httpOptions constant defined in the HeroService.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

//Define the heroesUrl with the address of the heroes resource on the server.
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor( private http: HttpClient, //Inject HttpClient into the
                            //constructor in a private property called http.
              private messageService: MessageService) { }
/*
  getHeroes(): Hero[] {
    return HEROES;
  }
*/


/** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}


/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
  //  this.messageService.add('HeroService: fetched heroes');
  //  return of(HEROES); // no longer use mock
  // use HTTP
  return this.http.get<Hero[]>(this.heroesUrl)
  // error handling
    .pipe(
     tap(heroes => this.log(`tapping...fetched heroes`)),
     catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
  /*  this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
    */
     const url = `${this.heroesUrl}/${id}`;
     return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`_fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}