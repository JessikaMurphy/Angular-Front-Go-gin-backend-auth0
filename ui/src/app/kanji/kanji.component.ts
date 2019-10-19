import { Component, OnInit } from '@angular/core';
import { KanjiService, Kanji, ApiKey } from '../kanji.service'

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {

  activeKanjis: Kanji[]
  apiKey: string

  constructor(private kanjiService: KanjiService) { }

  ngOnInit() {
    this.getAll
  }

  getAll(){
    this.kanjiService.getKanjiList().subscribe((data: Kanji[]) => {
      this.activeKanjis
    })
    
  }
  addApiKey(){
    var apiKey : ApiKey = {
      message: this.apiKey
    }
    this.kanjiService.addApiKey(apiKey).subscribe()
  }

}
