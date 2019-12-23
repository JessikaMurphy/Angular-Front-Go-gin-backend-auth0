(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ngx-cytoscape'] = {}),global.core,global.common));
}(this, (function (exports,core,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CytoscapeComponent = (function () {
    function CytoscapeComponent(_el) {
        this._el = _el;
        this._layout = this._layout || {
            name: 'grid',
            directed: true,
            padding: 0
        };
        this._zoom = this._zoom || {
            min: 0.1,
            max: 1.5
        };
        this._style = this._style || cytoscape.stylesheet()
            .selector('node')
            .css({
            'content': 'data(name)',
            'shape': 'rectangle',
            'text-valign': 'center',
            'background-color': 'data(faveColor)',
            'width': '200px',
            'height': '100px',
            'color': 'black'
        })
            .selector(':selected')
            .css({
            'border-width': 3,
            'border-color': '#333'
        })
            .selector('edge')
            .css({
            'label': 'data(label)',
            'color': 'black',
            'curve-style': 'bezier',
            'opacity': 0.666,
            'width': 'mapData(strength, 70, 100, 2, 6)',
            'target-arrow-shape': 'triangle',
            'line-color': 'data(faveColor)',
            'source-arrow-color': 'data(faveColor)',
            'target-arrow-color': 'data(faveColor)'
        })
            .selector('edge.questionable')
            .css({
            'line-style': 'dotted',
            'target-arrow-shape': 'diamond'
        })
            .selector('.faded')
            .css({
            'opacity': 0.25,
            'text-opacity': 0
        });
    }
    /**
     * @return {?}
     */
    CytoscapeComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.render();
    };
    /**
     * @return {?}
     */
    CytoscapeComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (!this.cy) {
            this.cy = cytoscape({
                container: this.el.nativeElement,
                layout: this.layout,
                minZoom: this.zoom.min,
                maxZoom: this.zoom.max,
                style: this.style,
                elements: this.elements,
            });
        }
        else {
            this.cy.layout = this.layout;
            // this.cy.nodes().forEach(node => {
            //     node.remove();
            // });
            this.cy.nodes().remove();
            this.cy.add(this.elements);
            this.cy.minZoom(this.zoom.min);
            this.cy.maxZoom(this.zoom.max);
        }
    };
    Object.defineProperty(CytoscapeComponent.prototype, "elements", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elements;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._elements = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CytoscapeComponent.prototype, "style", {
        get: /**
         * @return {?}
         */
        function () {
            return this._style;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CytoscapeComponent.prototype, "layout", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layout;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CytoscapeComponent.prototype, "zoom", {
        get: /**
         * @return {?}
         */
        function () {
            return this._zoom;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._zoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CytoscapeComponent.prototype, "cy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cy;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._cy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CytoscapeComponent.prototype, "el", {
        get: /**
         * @return {?}
         */
        function () {
            return this._el;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._el = value;
        },
        enumerable: true,
        configurable: true
    });
    CytoscapeComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-cytoscape',
                    template: '<div id="cy"></div>',
                    styles: ["#cy {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        left: 0;\n        top: 0;\n    }"]
                },] },
    ];
    /** @nocollapse */
    CytoscapeComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    CytoscapeComponent.propDecorators = {
        "elements": [{ type: core.Input },],
        "style": [{ type: core.Input },],
        "layout": [{ type: core.Input },],
        "zoom": [{ type: core.Input },],
        "cy": [{ type: core.Input },],
        "el": [{ type: core.Input },],
    };
    return CytoscapeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CytoscapeModule = (function () {
    function CytoscapeModule() {
    }
    CytoscapeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        CytoscapeComponent
                    ],
                    exports: [
                        CytoscapeComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    CytoscapeModule.ctorParameters = function () { return []; };
    return CytoscapeModule;
}());

exports.CytoscapeModule = CytoscapeModule;
exports.CytoscapeComponent = CytoscapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
