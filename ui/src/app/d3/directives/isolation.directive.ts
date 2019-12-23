import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../d3.service';
import { Node, Link, ForceDirectedGraph } from '../models';
import { NodeService } from 'src/app/node.service';


@Directive({
    selector: '[isolationOf]'
})

export class IsolationDirective implements OnInit {
    @Input('isolationOf') isolationOf: ElementRef
    @Input('isolationNode') isolationNode: Node
    
    nodes: Node[] = [];
    links: Link[] = [];
    constructor(private d3Service: D3Service, private _element: ElementRef, private nodeService: NodeService) {
        this.nodes = this.nodeService.getNodes()
        this.links = this.nodeService.getLinks()
    }

    ngOnInit() {
        this.d3Service.applyIsolationBehavior(this._element.nativeElement, this.isolationNode, this.nodes, this.links);
    }
}