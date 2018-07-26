import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Questionnaire } from '../models/questionnaire';

@Injectable()
export class QuestionnaireService{

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getQuestionnaires(token, questionnaireId = null){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    if(questionnaireId == null){
      return this._http.get(this.url+'questionnaires', options)
                       .map(res => res.json());
    }else{
      return this._http.get(this.url+'questionnaires/'+questionnaireId, options)
                       .map(res => res.json());
    }
  }

  getListQuestionnaire(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'questionnaire-list/', options)
                     .map(res => res.json());
  }

  addQuestionnaire(token, questionnaire: Questionnaire){
    let params = JSON.stringify(questionnaire);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'questionnaire', params, {headers: headers})
                     .map(res => res.json());
  }

  editQuestionnaire(token, id:string, questionnaire: Questionnaire){
    let params = JSON.stringify(questionnaire);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'questionnaire/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteQuestionnaire(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'questionnaire/'+id, options)
                     .map(res => res.json());
  }
}
