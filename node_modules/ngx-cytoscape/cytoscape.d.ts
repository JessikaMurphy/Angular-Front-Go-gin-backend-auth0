import { OnChanges, ElementRef } from '@angular/core';
export declare class CytoscapeComponent implements OnChanges {
    private _el;
    private _elements;
    private _style;
    private _layout;
    private _zoom;
    private _cy;
    constructor(_el: ElementRef);
    ngOnChanges(): any;
    render(): void;
    elements: any;
    style: any;
    layout: any;
    zoom: any;
    cy: any;
    el: ElementRef;
}
