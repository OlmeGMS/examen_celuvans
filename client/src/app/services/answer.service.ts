import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Answer } from '../models/answer';

@Injectable()
export class AnswerService{

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getAnswers(token, questionId = null){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    if(questionId == null){
        return this._http.get(this.url+'answers', options)
                        .map(res => res.json());
    }else{
        return this._http.get(this.url+'answers/'+questionId, options)
                         .map(res => res.json());
    }

  }

  getListAnswers(token) {
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'answers-list/', options)
                     .map(res => res.json());

  }

  getAnswer(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers:headers});

    return this._http.get(this.url+'answer/'+id, options)
                     .map(res => res.json());
  }

  addAnswer(token, answer: Answer){
    let params = JSON.stringify(answer);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'answer', params, {headers: headers})
                     .map(res => res.json());
  }

  editAnswer(token, id:string, answer: Answer){
    let params = JSON.stringify(answer);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'answer/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteAnswer(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'answer/'+id, options)
                     .map(res => res.json());
  }



}
