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
  selector: 'questionnaire-add',
  templateUrl: '../views/questionnaire-add.html',
  providers: [UserService, QuestionService, AnswerService, ExamService, QuestionnaireService]
})

export class QuestionnaireAddComponent implements OnInit {

  public titulo: string;
  public questions: Question[];
  public answer: Answer;
  public exams: Exam[];
  public questionnaire: Questionnaire;
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
    private _examService: ExamService,
    private _questionnaire: QuestionnaireService

  ){
    this.titulo = 'Crear Cuestionario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.questionnaire = new Questionnaire('','');

  }

  ngOnInit(){
    console.log('cargado el componente de questionnaire-add.component.ts');
    this.getListExams();
    this.getQuestionsTheme();
    var id = document.getElementById('exam');

    console.log(id);

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

  getListExamsQuestions() {

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

  getQuestionsTheme(){
    //let id = document.getElementById("exam").innerHTML;
             //document.getElementById("exam").innerHTML = this.user.name;
             //document.getElementById('image-logged').setAttribute('src', image_path);
             var id = document.getElementById('exam');

    console.log(id);
    alert('hola');
  //  this._route.params.forEach((params: Params) => {
        //let id = params['id'];
        //let id = this.question.theme;
        /*
        this._questionService.getQuestionsTheme(this.token, id).subscribe(

          response => {
            if (!response.questions) {
              this._router.navigate(['/']);
            } else {

              this.questions = response.questions;
              console.log(this.questions);
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
  //  });
  */
  }

  onSubmit(){
    console.log(this.questionnaire);
  }
}
