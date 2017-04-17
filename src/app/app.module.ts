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
  <pre>{{output}}{{end}}</pre>
  <button>Download XML</button>
  
  `,
})
export class AppComponent {
  urlList:any;
  newUrl:any;
  output:string;
  end:string='\r\n</urlset>';

	constructor(private http: Http) {
    this.output = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
      this.getJSON().subscribe((data:any) => {
        console.log(data.urlset);
        this.urlList = data.urlset.url;
        for(let i=0;i<this.urlList.length;i++){
          this.output += '\r\n\t<url>\r\n\t\t<loc>'+this.urlList[i].loc+'</loc>\r\n\t\t<lastmod>'+this.urlList[i].lastmod+'</lastmod>\r\n\t\t<changefreq>always</changefreq>\r\n\t</url>';
        }
      });
  }

  public getJSON(): Observable<any> {
         return this.http.get("./app/text.md")
                         .map((res:any) =>  JSON.parse(xml2json(res.text(),'  ')));
     }

  addUrl(){
    this.newUrl = 'https://example.co.uk/takeaway/'+this.newUrl;
    this.output += '\r\n\t<url>\r\n\t\t<loc>'+this.newUrl+'</loc>\r\n\t\t<lastmod>'+new Date()+'</lastmod>\r\n\t\t<changefreq>always</changefreq>\r\n\t</url>';
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
