import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { ThemeService } from '../services/theme.service';
import { ExamService } from '../services/exam.service';
import { Question } from '../models/question';
import { Theme } from '../models/theme';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam';
import { AppComponent } from '../app.component';

@Component({
  selector: 'exam-add',
  templateUrl: '../views/exam-add.html',
  providers: [UserService, QuestionService, AnswerService, ThemeService, ExamService]
})

export class ExamAddComponent implements OnInit {

  public titulo: string;
  public question: Question;
  public questions: Question[];
  public answer: Answer;
  public themes: Theme[];
  public exam: Exam;
  public identity;
  public token;
  public url: string;
  public alertMessage;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _themeService: ThemeService,
    private _examService: ExamService
  ) {
    this.titulo = 'Crear Examen';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.exam = new Exam('', '', '', '', '');
  }

  ngOnInit() {
    console.log('cargando el componente de exam-add.component.ts');
    this.getListThemes();
  }
/*
  getQuestionsList() {

    //this._route.params.forEach((params: Params) => {
    console.log('tokens hhhh ' + this.token);
    this._questionService.getListQuestions(this.token).subscribe(

      response => {
        if (!response.questions) {
          this._router.navigate(['/']);
        } else {
          //this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.questions = response.questions;
          console.log(this.questions);
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
    //});

  }
  */

  getListThemes(){

    this._themeService.getThemeList(this.token).subscribe(

      response => {
        if (!response.themes) {
          this._router.navigate(['/']);
        } else {
          //this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.themes = response.themes;
          console.log(this.themes);
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

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let user_id = params['user'];
      this.exam.user = user_id;
      console.log(this.exam);

        this._examService.addExam(this.token, this.exam).subscribe(
          response => {
            if(!response.exam){
              this.alertMessage = "ERROR en el servidor";
            }else{
              this.alertMessage = '¡El examen fue creado correctamente correctamente!';
              this.exam = response.exam;

            }

          },
          error => {
            var errorMessage = <any>error;
            if(errorMessage != null){
              var body = JSON.parse(error._body);
              this.alertMessage = body.message;
              console.log(error);
            }

          }
        );

    });
  }


}
