import { Component, OnInit } from '@angular/core';
import { KanjiService, Kanji, ApiKey,User } from '../kanji.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {

  apiKey: string
  username: string
  kanjis: Kanji[]

  constructor(private kanjiService: KanjiService) {
  }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.kanjiService.getKanjiList().subscribe(kanjis =>{
      this.kanjis = kanjis
      console.log(this.kanjis)
    }
    )
  }
  addApiKey(){
    var apiKey : ApiKey = {
      message: this.apiKey
    }
    this.kanjiService.addApiKey(apiKey).subscribe(user => {

      this.username = JSON.stringify(user)
      console.log(this.username)
      this.getAll()
      this.apiKey = ''
    })
  }


}
