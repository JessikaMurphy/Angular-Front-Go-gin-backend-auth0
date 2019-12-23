import { Injectable } from '@angular/core'
import { Link } from './models/link'
import { ForceDirectedGraph } from './models/force-directed-graph'
import { Node } from './models/node'
import { Kanji } from '../kanji.service'
import * as d3 from 'd3'
//import { DH_NOT_SUITABLE_GENERATOR } from 'constants'

@Injectable()
export class D3Service {
    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
  constructor() {
  }

   /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    }

    zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  applyIsolationBehavior(element, node: Node, nodes: Node[], links: Link[]){

    const d3element = d3.select(element);

      d3element.on('click', function(){
        console.log("you clicked on node: ", element.textContent)
        console.log("you clicked on node: ", element)
        console.log("node has id: ", element.childNodes[0].childNodes[0].id)
        var kanjiID = element.childNodes[0].childNodes[0].id
        var leftNeighbors = {}
        var rightNeighbors = {}
        var i = 0
        var j = 0
        var kanjiArray: Kanji[] = []
        var newLinks: Link[] = []
        links.forEach(element => {
          if (element.source == kanjiID){
            var target: any
            target = <number> element.target
            var characters = nodes[nodes.findIndex(node => node.id === target)].characters
            kanjiArray.push(new Kanji(target, characters))
            i++
            newLinks.push(element)
          }
          if (element.target == kanjiID){
            leftNeighbors[j] = element.source
            j++
          }
        })
        var newNodes: Node[] = []
        kanjiArray.forEach(kanji => {
          newNodes.push(new Node(kanji.id,kanji.characters))
        })
        console.log("new nodes: ",newNodes)
        console.log("new links: ", newLinks)
      })
  }
  
  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element)

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3.event.sourceEvent.stopPropagation();

      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag()
      .on('start', started));
  }
  /** The interactable graph we will simulate in this article
  * This method does not interact with the document, purely physical calculations with d3
  */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }

}