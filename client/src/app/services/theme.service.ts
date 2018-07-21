import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Theme } from '../models/theme';

@Injectable()
export class ThemeService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getTheme(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'theme/'+id, options)
                     .map(res => res.json());
  }

  getThemeList(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'themes-list/', options)
      .map(res => res.json());
  }

  addTheme(token, theme: Theme) {
    let params = JSON.stringify(theme);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'theme', params, { headers: headers })
                     .map(res => res.json());

  }

}
