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
var core_1 = require("@angular/core"); //, Input, Output
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var http_2 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.getJSON().subscribe(function (data) {
            console.log(data.urlset);
            _this.urlList = data.urlset.url;
        });
    }
    AppComponent.prototype.getJSON = function () {
        return this.http.get("./app/text.md")
            .map(function (res) { return JSON.parse(xml2json(res.text(), '  ')); });
    };
    AppComponent.prototype.addUrl = function () {
        this.newUrl = 'https://example.co.uk/takeaway/' + this.newUrl;
        this.urlList.push({ "changefreq": "always", "lastmod": new Date(), "loc": this.newUrl });
        console.log(this.urlList);
        this.newUrl = '';
    };
    AppComponent.prototype.convertXml = function () {
        this.downloadFile(this.urlList);
    };
    AppComponent.prototype.downloadFile = function (data) {
        var blob = new Blob([data], { type: 'text/xml' });
        var url = window.URL.createObjectURL(blob);
        console.log(url);
        window.open(url);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: "\n  <div *ngFor= \"let url of urlList\"><p> {{url.loc}} </p></div>\n  https://example.co.uk/takeaway/<input type=\"text\" [(ngModel)]=\"newUrl\"/><button (click)=\"addUrl()\">Add</button><br>\n  <button (click)=\"convertXml()\">Download XML</button>\n  ",
    }),
    __metadata("design:paramtypes", [http_2.Http])
], AppComponent);
exports.AppComponent = AppComponent;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            common_1.CommonModule,
        ],
        declarations: [AppComponent,
        ],
        providers: [AppComponent,
        ],
        exports: [AppComponent],
        bootstrap: [AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map