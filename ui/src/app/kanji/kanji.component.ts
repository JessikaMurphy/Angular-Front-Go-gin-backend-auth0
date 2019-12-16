import { Component, OnInit } from '@angular/core';
import { KanjiService, Kanji, ApiKey, User, Vocab } from '../kanji.service'
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {

  apiKey: string
  username: string
  kanjiList: Kanji[]
  vocabList: Vocab[]
  user: User
  users: any = []

  constructor(private kanjiService: KanjiService) {
  }

  ngOnInit() {
    if(localStorage.getItem('kanjiList')!=null){
      this.kanjiList = JSON.parse(localStorage.getItem('kanjiList'))
    }
    if(localStorage.getItem('vocabList')!=null){
      this.vocabList = JSON.parse(localStorage.getItem('vocabList'))
    }
  }

  getAll(){
    return this.kanjiService.getKanjiList().subscribe(data =>{
      this.user = data
      }
    ) 
  }
  addApiKey(){
    var apiKey : ApiKey = {
      message: this.apiKey
    }
    this.kanjiService.addApiKey(apiKey).subscribe(user => {this.username = user.user
      this.kanjiList = user.kanjiList
      localStorage.setItem('kanjiList',JSON.stringify(user.kanjiList))
      localStorage.setItem('vocabList',JSON.stringify(user.vocabList))
      this.vocabList = user.vocabList
    })    
    this.apiKey = ''
  }

  
}
