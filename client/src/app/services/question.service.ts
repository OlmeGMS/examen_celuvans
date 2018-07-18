import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Question } from '../models/question';

@Injectable()
export class QuestionService{

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getQuestions(token, page){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'questions/'+page, options)
                     .map(res => res.json());
  }

  getListQuestions(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'questions-list/', options)
                     .map(res => res.json());
  }

  getQuestion(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'question/'+id, options)
                     .map(res => res.json());
  }

  addQuestion(token, question: Question){
    let params = JSON.stringify(question);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'question', params, {headers: headers})
                     .map(res => res.json());
  }

  editQuestion(token, id:string, question: Question){
    let params = JSON.stringify(question);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'question/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteQuestion(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'question/'+id, options)
                     .map(res => res.json());
  }



}
