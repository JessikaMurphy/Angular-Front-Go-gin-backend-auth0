import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  constructor(private httpClient: HttpClient) { }

  getKanjiList() {
    return this.httpClient.get(environment.gateway + '/kanji');
  }
  addApiKey(apiKey: ApiKey){
    console.log(apiKey.message)
    return this.httpClient.post(environment.gateway + '/kanji', apiKey)
  }
}

export class Kanji {
  characters: string
}
export class ApiKey {
  message: string
}

