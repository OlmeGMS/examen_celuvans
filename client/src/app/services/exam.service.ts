import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Exam } from '../models/exam';

@Injectable()
export class ExamService {

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getListExams(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'exams-list/', options)
                     .map(res => res.json());
  }

  getExam(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'exam/'+id, options)
                     .map(res => res.json());
  }

  addExam(token, exam: Exam){
    let params = JSON.stringify(exam);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'exam', params, {headers: headers})
                     .map(res => res.json());
  }

  editExam(token, id:string, exam: Exam){
    let params = JSON.stringify(exam);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'exam/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteExam(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'exam/'+id, options)
                     .map(res => res.json());
  }


}
