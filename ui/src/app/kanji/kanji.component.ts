import { Component, OnInit } from '@angular/core';
import { KanjiService, Kanji, ApiKey } from '../kanji.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {

  data: any[] = [];
  apiKey: string
  userName: string
  kanji$: Observable<any>

  constructor(private kanjiService: KanjiService) {
    this.kanjiService.getKanjiList().subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.kanji$ = this.kanjiService.getKanjiList()
  }
  addApiKey(){
    var apiKey : ApiKey = {
      message: this.apiKey
    }
    this.kanjiService.addApiKey(apiKey).subscribe((data: Kanji[]) => {
      this.getAll()
      this.apiKey = ''
    })
  }


}
