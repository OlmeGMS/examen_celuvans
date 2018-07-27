import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { ExamService } from '../services/exam.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam';
import { Questionnaire } from '../models/questionnaire';
import { AppComponent } from '../app.component';

@Component({
  selector: 'questionnaire-table',
  templateUrl: '../views/questionnaire-table.html',
  providers: [UserService, QuestionService, AnswerService, ExamService, QuestionnaireService]
})

export class QuestionnaireTableComponent implements OnInit {

  public titulo: string;
  public exams: Exam[];
  public questionnaires: Questionnaire[];
  public questions: Question[];
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
    private _questionnaireService: QuestionnaireService
  ){
    this.titulo = 'Questionarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('cargado el componete de questionnaire-tablet.component.ts');
    this.getListQuestionnaire();

  }

  getListQuestionnaire(){
    this._questionnaireService.getListQuestionnaire(this.token).subscribe(
      response => {
        if(!response.questionnaires){
          this._router.navigate(['/']);
        }else{
          this.questionnaires = response.questionnaires;
          console.log(this.questionnaires);
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

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelQuestionnaire(){
    this.confirmado = null;
  }

  onDeleteQuestionnaire(id){
    this._questionnaireService.deleteQuestionnaire(this.token, id).subscribe(
      response => {
        if (!response.exam) {
          alert('Error en el servidor');
          //alert('Pregutna Elimindada');
        }
        this.getListQuestionnaire();
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
