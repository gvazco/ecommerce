import { Component } from '@angular/core';
import { CongeneralService } from './services/congeneral.service';
import { GLOBAL } from './services/GLOBAL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  public general : any = {};
  public url;
  public headers = false;
  
  constructor(
    private _congeneralService : CongeneralService,
    private http: HttpClient,
    private _router : Router
    ){
      this._congeneralService.get_data().subscribe( response =>{ this.general = response.data; this.url = GLOBAL.url; $('#favicon_icon').attr('href',this.url+'congeneral/resources/thumbnails/'+this.general.favicon); $('#title_general').text(this.general.titulo); }, error=>{ } ); this._congeneralService.get_data().subscribe( response =>{ this.general = response.data; this.url = GLOBAL.url; $('#favicon_icon').attr('href',this.url+'congeneral/resources/thumbnails/'+this.general.favicon); $('#title_general').text(this.general.titulo); }, error=>{ } ); 
  }

  ngOnInit(): void{
    
  }

  onActivate(event) {
      window.scroll(0,0);
     
  }
}
