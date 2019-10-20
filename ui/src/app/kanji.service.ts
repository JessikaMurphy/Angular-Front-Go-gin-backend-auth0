import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Kanji {
  characters: string
}

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  getKanjiList(): Observable<Kanji[]> {
    return this.httpClient.get(environment.gateway + '/kanji')
      .pipe(
        map((data: any[]) => data.map((item:any) => new Kanji(
          item.characters
        ))),
        tap(kanji => console.log('fetched kanji')),
        
        catchError(this.handleError('getKanjiList', []))
      )
  }


  addApiKey(apiKey: ApiKey){
    console.log(apiKey.message)
    return this.httpClient.post(environment.gateway + '/kanji', apiKey)
  }
}

export class Kanji {
  characters: string
  constructor(characters: string) {
    this.characters = characters
  }
}
export class ApiKey {
  message: string
}
export class  User {
  userName: string
  constructor(userName: string) {
    this.userName = userName
  }
}

