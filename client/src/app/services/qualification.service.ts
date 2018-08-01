import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Answer } from '../models/answer';
import { Qualification } from '../models/qualification';

@Injectable()
export class QualificationService {

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getQualifications(token, userId = null) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this._http.get(this.url + '', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'qualifications-user/' + userId, options)
        .map(res => res.json());
    }
  }

  getQualificationUserTheme(token, userId = null, examId = null){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this._http.get(this.url + '', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'qualifications-user-exam/' + userId+'&&'+ examId, options)
        .map(res => res.json());
    }
  }

  getQualificationsExam(token, examId = null) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });
    if (examId == null) {
      return this._http.get(this.url + '', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'qualifications-exam/' + examId, options)
        .map(res => res.json());
    }
  }

  getQualificationsExamApproved(token, examId = null) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });
    if (examId == null) {
      return this._http.get(this.url + '', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'qualifications-exam-approved/' + examId, options)
        .map(res => res.json());
    }
  }

  getQualificationsExamReprobate(token, examId = null) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });
    if (examId == null) {
      return this._http.get(this.url + '', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'qualifications-exam-reprobate/' + examId, options)
        .map(res => res.json());
    }
  }

  getListQualification(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers : headers });
    return this._http.get(this.url+'qualification-list/', options)
                     .map(res => res.json());
  }

  getQualification(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers:headers});

    return this._http.get(this.url+'qualification/'+id, options)
                     .map(res => res.json());
  }

  addQualification(token, qualification: Qualification){
    let params = JSON.stringify(qualification);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'qualification', params, {headers: headers})
                     .map(res => res.json());
  }

  editQualification(token, id:string, qualification: Qualification){
    let params = JSON.stringify(qualification);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'qualification/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteQualification(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'qualification/'+id, options)
                     .map(res => res.json());
  }


}
