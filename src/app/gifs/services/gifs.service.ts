import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];

  private apiKey: string = 'xq37G5BIWvF4ZaJETMDezzfnCwZjt2xR';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Carga desde localStorage");

  }

  get tagHistory() {
    return [...this._tagsHistory];
  }
  private organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if (this.tagHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter ( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift ( tag ) ;

    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  public searchTag(tag: string): void {
    tag = tag.toLowerCase();
    if (tag.length > 0) {
      this.organizeHistory(tag);

      if (this._tagsHistory.includes(tag)) {
        this._tagsHistory=this._tagsHistory.filter((oldTag)=>oldTag!=tag)

      }
      this._tagsHistory.unshift(tag);

      const parametros = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', 10)
        .set('q', tag);

      this.http
        .get<SearchResponse>(`${this.serviceUrl}/search?` + parametros)
        .subscribe((resp) => {
          this.gifList = resp.data;
          console.log(resp);
        });
    }
    if (this._tagsHistory.length > 10) this._tagsHistory.pop();
  }
  private saveLocalStorage():void{
    localStorage.setItem("history",JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void{
    if ( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
        if (this._tagsHistory.length>0) {
          this.searchTag(this.tagHistory[0]); //Cargar el primer elemento del array al recargar la pagina
        }
  }

}
