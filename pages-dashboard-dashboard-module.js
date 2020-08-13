(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-dashboard-dashboard-module"],{

/***/ "./node_modules/ng2-charts/charts/charts.js":
/*!**************************************************!*\
  !*** ./node_modules/ng2-charts/charts/charts.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var chart_js_1 = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/src/chart.js");
/* tslint:disable-next-line */
var BaseChartDirective = (function () {
    function BaseChartDirective(element) {
        this.labels = [];
        this.options = {};
        this.chartClick = new core_1.EventEmitter();
        this.chartHover = new core_1.EventEmitter();
        this.initFlag = false;
        this.element = element;
    }
    BaseChartDirective.prototype.ngOnInit = function () {
        this.ctx = this.element.nativeElement.getContext('2d');
        this.cvs = this.element.nativeElement;
        this.initFlag = true;
        if (this.data || this.datasets) {
            this.refresh();
        }
    };
    BaseChartDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the data or datasets
            if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
                if (changes['data']) {
                    this.updateChartData(changes['data'].currentValue);
                }
                else {
                    this.updateChartData(changes['datasets'].currentValue);
                }
                this.chart.update();
            }
            else {
                // otherwise rebuild the chart
                this.refresh();
            }
        }
    };
    BaseChartDirective.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    };
    BaseChartDirective.prototype.getChartBuilder = function (ctx /*, data:Array<any>, options:any*/) {
        var _this = this;
        var datasets = this.getDatasets();
        var options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = function (active) {
                if (active && !active.length) {
                    return;
                }
                _this.chartHover.emit({ active: active });
            };
        }
        if (!options.onClick) {
            options.onClick = function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            };
        }
        var opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        return new chart_js_1.Chart(ctx, opts);
    };
    BaseChartDirective.prototype.updateChartData = function (newDataValues) {
        if (Array.isArray(newDataValues[0].data)) {
            this.chart.data.datasets.forEach(function (dataset, i) {
                dataset.data = newDataValues[i].data;
                if (newDataValues[i].label) {
                    dataset.label = newDataValues[i].label;
                }
            });
        }
        else {
            this.chart.data.datasets[0].data = newDataValues;
        }
    };
    BaseChartDirective.prototype.getDatasets = function () {
        var _this = this;
        var datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = this.data.map(function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                });
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map(function (elm, index) {
                var newElm = Object.assign({}, elm);
                if (_this.colors && _this.colors.length) {
                    Object.assign(newElm, _this.colors[index]);
                }
                else {
                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }
        if (!datasets) {
            throw new Error("ng-charts configuration error,\n      data or datasets field are required to render char " + this.chartType);
        }
        return datasets;
    };
    BaseChartDirective.prototype.refresh = function () {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        this.ngOnDestroy();
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    };
    return BaseChartDirective;
}());
BaseChartDirective.defaultColors = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96]
];
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BaseChartDirective.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BaseChartDirective.prototype, "datasets", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BaseChartDirective.prototype, "labels", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BaseChartDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BaseChartDirective.prototype, "chartType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BaseChartDirective.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BaseChartDirective.prototype, "legend", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BaseChartDirective.prototype, "chartClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BaseChartDirective.prototype, "chartHover", void 0);
BaseChartDirective = __decorate([
    core_1.Directive({ selector: 'canvas[baseChart]', exportAs: 'base-chart' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BaseChartDirective);
exports.BaseChartDirective = BaseChartDirective;
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function () { return '#fff'; }),
        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointBorderColor: colors.map(function () { return '#fff'; }),
        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function (color) { return rgba(color, 1); }),
        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors(count) {
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}
var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
ChartsModule = __decorate([
    core_1.NgModule({
        declarations: [
            BaseChartDirective
        ],
        exports: [
            BaseChartDirective
        ],
        imports: []
    })
], ChartsModule);
exports.ChartsModule = ChartsModule;


/***/ }),

/***/ "./node_modules/ng2-charts/index.js":
/*!******************************************!*\
  !*** ./node_modules/ng2-charts/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./charts/charts */ "./node_modules/ng2-charts/charts/charts.js"));


/***/ }),

/***/ "./node_modules/ng2-charts/ng2-charts.js":
/*!***********************************************!*\
  !*** ./node_modules/ng2-charts/ng2-charts.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./index */ "./node_modules/ng2-charts/index.js"));


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"panel-header panel-header-sm\">\n\n</div>\n<div class=\"main-content\">\n  <div class=\"row\">\n    <div class=\"col-lg-3 col-sm-6\">\n      <div class=\"card card-stats\">\n        <div class=\"card-body \">\n          <div class=\"statistics statistics-horizontal\">\n            <div class=\"info info-horizontal\">\n              <div class=\"row\">\n             \n                <div class=\"col-7 text-right\">\n                  <h3 class=\"info-title\">All</h3>\n                  <h5 class=\"stats-title\">1058</h5>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"card-footer \">\n          \n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-3 col-sm-6\">\n      <div class=\"card card-stats\">\n        <div class=\"card-body \">\n          <div class=\"statistics statistics-horizontal\">\n            <div class=\"info info-horizontal\">\n              <div class=\"row\">\n           \n                <div class=\"col-7 text-right\">\n                  <h3 class=\"info-title\">Pending</h3>\n                  <h5 class=\"stats-title\">1000</h5>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n    \n        <div class=\"card-footer \">\n        \n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-3 col-sm-6\">\n      <div class=\"card card-stats\">\n        <div class=\"card-body \">\n          <div class=\"statistics statistics-horizontal\">\n            <div class=\"info info-horizontal\">\n              <div class=\"row\">\n              \n                <div class=\"col-7 text-right\">\n                  <h3 class=\"info-title text-right\">Completed</h3>\n                  <h5 class=\"stats-title\">200</h5>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n       \n        <div class=\"card-footer \">\n          \n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-3 col-sm-6\">\n      <div class=\"card card-stats\">\n        <div class=\"card-body \">\n          <div class=\"statistics statistics-horizontal\">\n            <div class=\"info info-horizontal\">\n              <div class=\"row\">\n              \n                <div class=\"col-7 text-right\">\n                  <h3 class=\"info-title\">Rejected</h3>\n                  <h5 class=\"stats-title\">10</h5>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n       \n        <div class=\"card-footer \">\n          \n        </div>\n      </div>\n    </div>\n\n\n\n   <!-- <div class=\"col-lg-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n         \n          <h6 class=\"card-title\"> CW Table</h6>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"table\">\n            <table class=\"table\">\n              <thead class=\" text-primary\">\n                <th>\n                  ID\n                </th>\n                <th>\n                  Account ID\n                </th>\n                <th>\n                  Amount\n                </th>\n                <th >\n                  SDC Status\n                </th>\n                <th >\n                  OPD Status\n                </th>\n                <th >\n                  Credit Status\n                </th>\n\n                <th >\n                  Overall Status\n                </th>\n         \n                \n               \n              </thead>\n              <tbody>\n                <tr>\n                  <td>\n                    <a href='#/tables/ngx-datatable' >111000</a>\n                  </td>\n                  <td>\n                    112-123-100251\n                  </td>\n                  <td>\n                   1000$\n                  </td>\n                  <td >\n                   Regular\n                   </td>\n                   <td >\n                    Success\n                   </td>\n                   <td >\n                    Verified\n                   </td>\n\n                  <td >\n                    Success\n                  </td>\n\n                </tr>\n\n                <tr>\n                  <td>\n                    <a href='#/tables/ngx-datatable' >111000</a>\n                  </td>\n                  <td>\n                    112-123-100251\n                  </td>\n                  <td>\n                   1000$\n                  </td>\n                  <td >\n                   Regular\n                   </td>\n                   <td>\n                    Success\n                   </td>\n                   <td >\n                    Verified\n                   </td>\n\n                  <td >\n                    Success\n                  </td>\n                 </tr>\n\n\n                <tr>\n                  <td>\n                    <a href='#/tables/ngx-datatable' >111000</a>\n                  </td>\n                  <td>\n                    112-123-100251\n                  </td>\n                  <td>\n                   1000$\n                  </td>\n                  <td>\n                   Regular\n                   </td>\n                   <td>\n                    Success\n                   </td>\n                   <td>\n                    Verified\n                   </td>\n\n                  <td >\n                    Success\n                  </td>\n                   </tr>\n\n                <tr>\n                  <td>\n                    <a href='#/tables/ngx-datatable' >111000</a>\n                  </td>\n                  <td>\n                    112-123-100251\n                  </td>\n                  <td>\n                   1000$\n                  </td>\n                  <td>\n                   Regular\n                   </td>\n                   <td>\n                    Success\n                   </td>\n                   <td>\n                    Verified\n                   </td>\n\n                  <td >\n                    Success\n                  </td>\n                 </tr>\n\n\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div> -->\n\n\n\n    <div class=\"col-lg-12\">\n      <div class=\"card \">\n        <div class=\"card-header \"><h4 class=\"card-title\">CW Data</h4></div>\n        <div class=\"card-body\">\n          <div class=\"toolbar\">\n            <!--        Here you can write extra buttons/actions for the toolbar              -->\n          </div>\n\n\n          <div class=\"dataTables_wrapper\">\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-md-6\">\n                <div class=\"dataTables_length\" id=\"datatable_length\">\n                  <label>\n                    Show\n                    <select\n                      name=\"datatable_length\"\n                      aria-controls=\"datatable\"\n                      class=\"form-control form-control-sm\"\n                      (change)=\"entriesChange($event)\"\n                    >\n                      <option value=\"10\" [selected]=\"entries==10\">10</option>\n                      <option value=\"25\" [selected]=\"entries==25\">25</option>\n                      <option value=\"50\" [selected]=\"entries==50\">50</option>\n                      <option value=\"-1\" [selected]=\"entries==-1\">All</option>\n                    </select>\n                    entries\n                    </label>\n                </div>\n              </div>\n              <div class=\"col-sm-12 col-md-6\">\n                <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                  <label>\n                    <input\n                      type=\"search\"\n                      class=\"form-control form-control-sm\"\n                      placeholder=\"Search records\"\n                      aria-controls=\"datatable\"\n                      (keyup)=\"filterTable($event)\"\n                    />\n                  </label>\n                </div>\n              </div>\n            </div>\n\n            <!-- <ngx-datatable\n            [rows]=\"rows\"\n            [columns]=\"columns\">\n          </ngx-datatable> -->\n          \n\n            <ngx-datatable\n                      class=\"bootstrap selection-cell\"\n                      [columnMode]=\"'force'\"\n                      [headerHeight]=\"50\"\n                      [footerHeight]=\"50\"\n                      [rowHeight]=\"'auto'\"\n                      [limit]=\"entries != -1 ? entries:undefined\"\n                      [rows]=\"temp\"\n                      (activate)=\"onActivate($event)\"\n              >\n\n                <!--            <ngx-datatable-column name=\"Id\" prop=\"$key\" ngx-datatable-cell-template>-->\n                <!--              <ng-template let-row=\"row\" let-value=\"value\">-->\n                <!--                <a (click)=\"editFunction(value.id)\">{{value.name}}</a>-->\n                <!--                <a href=\"#\" class=\"btn btn-round btn-warning btn-icon btn-sm edit\" (click)=\"editFunction($event)\"><i class=\"far fa-calendar-alt\"></i></a>-->\n\n                <!--              </ng-template>-->\n                <!--            </ngx-datatable-column>-->\n                <ngx-datatable-column name=\"id\" prop=\"id\">\n<!--                <ng-template ngx-datatable-cell-template let-row=\"row\" let-value=\"value\">-->\n<!--                  <a class=\"btn\" (click)=\"ViewDetails(row.id)\">-->\n<!--                    {{row.id}} &lt;!&ndash; or {{value}} &ndash;&gt;-->\n<!--                  </a>-->\n<!--                </ng-template>-->\n              </ngx-datatable-column>\n            <ngx-datatable-column name=\"Accountnumber\">\n              <ng-template ngx-datatable-cell-template let-row=\"row\" let-value=\"value\">\n                <a class=\"btn\" (click)=\"ViewDetails(row.id)\">\n                  {{row.accountnumber}} <!-- or {{value}} -->\n                </a>\n              </ng-template>\n\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Amount\"></ngx-datatable-column>\n              <ngx-datatable-column name=\"Date\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Sdcstatus\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Opdstatus\"></ngx-datatable-column>\n<!--            <ngx-datatable-column name=\"Creditstatus\"></ngx-datatable-column>-->\n<!--            <ngx-datatable-column name=\"Overallstatus\"></ngx-datatable-column>-->\n\n         \n          <ngx-datatable-column [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"false\" [resizeable]=\"false\">\n            <ng-template ngx-datatable-header-template let-value=\"value\" let-allRowsSelected=\"allRowsSelected\" let-selectFn=\"selectFn\">\n              Actions\n            </ng-template>\n            <ng-template ngx-datatable-cell-template let-value=\"value\" let-isSelected=\"isSelected\" let-onCheckboxChangeFn=\"onCheckboxChangeFn\">\n              <a href=\"#/tables/ngx-datatable/\" class=\"btn btn-round btn btn-info btn-icon btn-sm like\"><i class=\"fas fa-eye\"></i></a>\n              <a href=\"#\" class=\"btn btn-round btn-warning btn-icon btn-sm edit\" (click)=\"editFunction($event)\"><i class=\"far fa-calendar-alt\"></i></a>\n\n            </ng-template>\n        </ngx-datatable-column>\n            </ngx-datatable>\n          </div>\n        </div>\n      </div>\n    </div>\n<!--    <div>-->\n<!--      <ngx-datatable-->\n<!--        [rows]=\"rows\"-->\n<!--        [columns]=\"columns\">-->\n<!--      </ngx-datatable>-->\n<!--    </div>-->\n\n  </div>\n\n\n\n\n</div>\n");

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.css":
/*!*********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var DashboardComponent = /** @class */ (function () {
    // rows = [
    //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //   { name: 'Dany', gender: 'Male', company: 'KFC' },
    //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
    // ];
    // columns = [
    //   { prop: 'name' },
    //   { name: 'Gender' },
    //   { name: 'Company' }
    // ];
    function DashboardComponent(route, router) {
        this.route = route;
        this.router = router;
        this.test = "<button (click)=\"onSelect($event)\">Click me</button>";
        this.entries = 10;
        this.selected = [];
        this.temp = [];
        this.rows = [
            {
                id: 1,
                accountid: "4534534",
                accountnumber: "112-123-100445",
                accountname: "Croline chao",
                clientcode: "15737701612379002",
                amount: "103",
                date: "07/28/2020",
                sdcstatus: "Regular",
                opdstatus: "Success",
                creditstatus: "Success",
                overallstatus: "Success"
            },
            {
                id: 2,
                accountid: "7675756",
                accountnumber: "112-123-79888",
                accountname: "Jimmy stood",
                clientcode: "445656546212342",
                amount: "7676",
                date: "07/28/2020",
                sdcstatus: "Regular",
                opdstatus: "Success",
                creditstatus: "Success",
                overallstatus: "Success"
            },
            {
                id: 3,
                accountid: "3423423",
                accountnumber: "112-123-12321",
                clientcode: "855756756767676",
                accountname: "Fidds catas",
                amount: "6565",
                date: "07/28/2020",
                sdcstatus: "Regular",
                opdstatus: "Success",
                creditstatus: "Success",
                overallstatus: "Success"
            },
            {
                id: 4,
                accountid: "2343243",
                accountnumber: "112-123-80797",
                clientcode: "34532646456454754",
                accountname: "Nicolas fredd",
                amount: "656",
                date: "07/28/2020",
                sdcstatus: "iRegular",
                opdstatus: "Success",
                creditstatus: "Success",
                overallstatus: "Success"
            }
        ];
        this.temp = this.rows.map(function (prop, key) {
            return __assign(__assign({}, prop), { id: key });
        });
    }
    DashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.hexToRGB = function (hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        }
        else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    };
    DashboardComponent.prototype.entriesChange = function ($event) {
        this.entries = $event.target.value;
    };
    DashboardComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.temp = this.rows.filter(function (d) {
            for (var key in d) {
                if (d[key].toLowerCase().indexOf(val) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    DashboardComponent.prototype.onSelect = function ($event) {
        console.log('Select Event', $event);
    };
    DashboardComponent.prototype.onActivate = function (event) {
        this.activeRow = event.row;
    };
    DashboardComponent.prototype.likeFunction = function ($event) {
        $event.preventDefault();
        var details = "You've clicked LIKE button on \n{\n";
        for (var key in this.activeRow) {
            details += key + ": " + this.activeRow[key] + "\n";
        }
        details += "}.";
        alert(details);
    };
    DashboardComponent.prototype.editFunction = function ($event) {
        $event.preventDefault();
        var details = "You've clicked EDIT button on \n{\n";
        for (var key in this.activeRow) {
            details += key + ": " + this.activeRow[key] + "\n";
        }
        details += "}.";
        alert(details);
    };
    DashboardComponent.prototype.deleteFunction = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.temp = this.rows.filter(function (entry) { return entry.id !== _this.activeRow.id; });
    };
    DashboardComponent.prototype.ViewDetails = function (id) {
        this.router.navigate(['/tables/ngx-datatable'], { queryParams: { id: id } });
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-dashboard",
            template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./dashboard.component.css */ "./src/app/pages/dashboard/dashboard.component.css")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-charts/ng2-charts */ "./node_modules/ng2-charts/ng2-charts.js");
/* harmony import */ var ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _dashboard_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard.routing */ "./src/app/pages/dashboard/dashboard.routing.ts");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_dashboard_routing__WEBPACK_IMPORTED_MODULE_7__["DashboardRoutes"]),
                _components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"],
                ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_3__["ChartsModule"]
            ],
            declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["DashboardComponent"]],
            exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["DashboardComponent"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.routing.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.routing.ts ***!
  \******************************************************/
/*! exports provided: DashboardRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutes", function() { return DashboardRoutes; });
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var DashboardRoutes = [
    {
        path: "",
        children: [
            {
                path: "dashboard",
                component: _dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"]
            }
        ]
    }
];


/***/ })

}]);
//# sourceMappingURL=pages-dashboard-dashboard-module.js.map