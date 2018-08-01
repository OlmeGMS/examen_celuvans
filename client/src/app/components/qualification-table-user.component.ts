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
  selector: 'qualification-table-user',
  templateUrl: '../views/qualification-tablet-user.html',
  providers: [UserService, QuestionService, AnswerService, QualificationService, ExamService ]
})

export class QualificationTableUserComponent implements OnInit {
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
    this.getQualifications(this.identity._id);
  }

  getQualifications(id_user){
    this._qualificationService.getQualifications(this.token, id_user).subscribe(
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

}
