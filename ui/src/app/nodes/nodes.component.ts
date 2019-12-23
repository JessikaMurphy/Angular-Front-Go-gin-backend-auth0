import { Component, OnInit } from '@angular/core';
import { Node, Link } from '../d3/models';
import { Kanji, Vocab} from '../kanji.service'
import { NodeService } from '../node.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  kanjiList: any[] = []
  kanjiArray: Kanji[] = []
  vocabList: any[] = []
  vocabArray: Vocab[] = []


  constructor(private nodeService: NodeService) {
    /*
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;
    */

    if(localStorage.getItem('kanjiList') != null){
      this.kanjiList = JSON.parse(localStorage.getItem('kanjiList'))
      this.kanjiList.forEach(element => {
        this.kanjiArray.push(new Kanji(element.kanji.id, element.kanji.characters))
      });
    }
    if(localStorage.getItem('vocabList')!=null){
      this.vocabList = JSON.parse(localStorage.getItem('vocabList'))
      this.vocabList.forEach(element => {
        this.vocabArray.push(new Vocab(element.vocab.id, element.vocab.characters, element.vocab.component_subject_ids))
      });
    }
    
    const N = this.vocabArray.length
    /** constructing the nodes array */
    
    this.kanjiArray.forEach(kanji => {
      this.nodes.push(new Node(kanji.id,kanji.characters))
    })
    
    for (let i = 0; i < N; i++) {
      // increasing connections toll on connecting nodes
      var componentIDs = this.vocabArray[i].component_subject_ids
      if(componentIDs.length >= 2){
        componentIDs.forEach(id =>{
          this.nodes[this.getIndex(id)].linkCount++
        // connecting the nodes before starting the simulation 
        })
      }
      if (componentIDs.length == 2){
        this.links.push(new Link(componentIDs[0], componentIDs[1]))
      }
      if (componentIDs.length == 3){
        this.links.push(new Link(componentIDs[0], componentIDs[1]))
        this.links.push(new Link(componentIDs[1], componentIDs[2]))
      }
      if (componentIDs.length == 4){
        this.links.push(new Link(componentIDs[0], componentIDs[1]))
        this.links.push(new Link(componentIDs[1], componentIDs[2]))
        this.links.push(new Link(componentIDs[2], componentIDs[3]))
      }
      if(componentIDs.length > 4){
        console.log("there is a vocab longer than 4 kanji long")
      }
    }
    
  }
  public getIndex(id: number): number {
    return this.nodes.findIndex(node => node.id == id.toString())
  }
  public getLinks(): Link[]{
    return this.links
  }
  public getNodes(): Node[]{
    return this.nodes
  }
}
