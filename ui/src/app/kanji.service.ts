import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Kanji {
  characters: string
}

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  getKanjiList(): Observable<User>{
    return this.httpClient.get<User>(environment.gateway + '/kanji',this.httpOptions)
    .pipe(retry(1),
    catchError(this.handleError))
  }

  addApiKey(apiKey: ApiKey){
    console.log(apiKey.message)
    return this.httpClient.post(environment.gateway + '/kanji', apiKey).pipe(
        map((data:any) => new User(
          data.message,data.user,data.level, data.kanjiList,data.vocabList
        )))
  }
}

export class Kanji {
  characters: string
  constructor(characters: string) {
    this.characters = characters
  }
}
export class Vocab {
  characters: string
  constructor(characters: string) {
    this.characters = characters
  }
}
export class ApiKey {
  message: string
}
export class User {
  message: string
  user: string
  level: number
  kanjiList: Kanji[]
  vocabList: Vocab[]
  constructor(message: string, user: string, level: number, kanjiList: Kanji[],vocabList: Vocab[]) {
    this.message = message
    this.user = user
    this.level = level
    this.kanjiList = kanjiList
    this.vocabList = vocabList
  }
}

