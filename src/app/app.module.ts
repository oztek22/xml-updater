import { NgModule,ModuleWithProviders, Component } from '@angular/core';//, Input, Output
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';



@Component({
  moduleId: module.id,
	selector: 'my-app',
	template: `
  <div *ngFor= "let url of urlList"><p> {{url.loc}} </p></div>
  https://example.co.uk/takeaway/<input type="text" [(ngModel)]="newUrl"/><button (click)="addUrl()">Add</button><br>
  <button (click)="convertXml()">Download XML</button>
  `,
})
export class AppComponent {
  urlList:any;
  newUrl:any;

	constructor(private http: Http) {
      this.getJSON().subscribe((data:any) => {
        console.log(data.urlset);
        this.urlList = data.urlset.url;
      });
  }

  public getJSON(): Observable<any> {
         return this.http.get("./app/text.md")
                         .map((res:any) =>  JSON.parse(xml2json(res.text(),'  ')));
     }

  addUrl(){
    this.newUrl = 'https://example.co.uk/takeaway/'+this.newUrl;
    this.urlList.push({"changefreq":"always","lastmod":new Date(),"loc":this.newUrl})
    console.log(this.urlList);
    this.newUrl = '';
  }

  convertXml(){
    this.downloadFile(this.urlList);
  }

  downloadFile(data: Response){
    var blob = new Blob([data], { type: 'text/xml' });
    var url= window.URL.createObjectURL(blob);
    console.log(url);
    window.open(url);
  }
}


@NgModule({
  imports:[ BrowserModule,
				    FormsModule,
				    HttpModule,
            CommonModule,
            // SharedModule
          ],
  declarations: [ AppComponent,
                ],
  providers: [  AppComponent,
              ],
    exports: [  AppComponent  ],
    bootstrap: [ AppComponent ] 
})
export class AppModule { }
