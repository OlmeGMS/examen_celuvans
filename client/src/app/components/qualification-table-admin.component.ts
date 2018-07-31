import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { ExamService } from '../services/exam.service'
import { QualificationService } from '../services/qualification.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam'
import { Qualification } from '../models/qualification';

import { AppComponent } from '../app.component';

@Component({
  selector: 'qualification-table-admin',
  templateUrl: '../views/qualification-tablet-admin.html',
  providers: [UserService, QuestionService, AnswerService, QualificationService, ExamService ]
})

export class QualificationTableComponent implements OnInit {

  public titulo: string;
  public questions: Question[];
  public answers: Answer[];
  public exams: Exam[]
  public qualifications: Qualification[];
  public qualification: Qualification;
  public aprobates: Qualification[];
  public reprobates: Qualification[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _examService: ExamService,
    private _qualificationService: QualificationService
  ){
    this.titulo = 'Calificaciones';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.qualification = new Qualification('','',0,0);
  }

  ngOnInit(){
    console.log('cargado el componente de qualification-tables-admin.ts');
    this.getListExams();
    //this.getListQualification();
    //this.getListQualificationExam(0);
  }

  public devices = 'one two three'.split(' ');
  public selectedDevice = 'two';
  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
    // ... do other stuff here ...
}

  getListExams() {

    this._examService.getListExams(this.token).subscribe(

      response => {
        if (!response.exams) {
          this._router.navigate(['/']);
        } else {

          this.exams = response.exams;
          console.log(this.exams);
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

          console.log(error);
        }

      }
    );
}

/*
  getListQualification(){
    this._qualificationService.getListQualification(this.token).subscribe(
      response => {

        if(!response.qualifications){
          this._router.navigate(['/']);
        }else{
          this.qualifications = response.qualifications;
          console.log(this.qualifications);
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
  }
  */
  getListQualificationExam(id_exam){
    console.log(id_exam);
    this._qualificationService.getQualificationsExam(this.token, id_exam).subscribe(
      response => {
        if(!response.qualifications){
          this._router.navigate(['/'])
        }else{
          this.qualifications = response.qualifications;
          console.log(this.qualifications)
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

          console.log(error);
        }
      }
    );
  }

  getQualificationsExamApproved(id_exam){
    console.log(id_exam);
    this._qualificationService.getQualificationsExamApproved(this.token, id_exam).subscribe(
      response => {
        if(!response.qualifications){
          this._router.navigate(['/'])
        }else{
          this.aprobates = response.qualifications;
          console.log(this.aprobates)
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

          console.log(error);
        }
      }
    );
  }

  getQualificationsExamReprobate(id_exam){
    console.log(id_exam);
    this._qualificationService.getQualificationsExamReprobate(this.token, id_exam).subscribe(
      response => {
        if(!response.qualifications){
          this._router.navigate(['/'])
        }else{
          this.reprobates = response.qualifications;
          console.log(this.reprobates)
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

          console.log(error);
        }
      }
    );
  }



  onSubmit(){

  }
}
