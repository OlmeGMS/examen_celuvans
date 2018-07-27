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
  selector: 'questionnaire-details',
  templateUrl: '../views/questionnaire-details.html',
  providers: [UserService, QuestionService, AnswerService, ExamService, QuestionnaireService]
})

export class QuestionnaireDetailComponent implements OnInit {
  public titulo: string;
  public exams: Exam[];
  public questionnaire: Questionnaire;
  public questions: Question[];
  public answers: Answer[];
  public question: Question;
  public exam: Exam;
  public answer: Answer;
  public identity;
  public token;
  public url: string;
  public confirmado;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _examService: ExamService,
    private _questionnaireService: QuestionnaireService
  ) {
    this.titulo = 'Questionario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargado el component de questionnaire-details.component.ts');
    this.getQuestionnaire();

  }

  getQuestionnaire() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._questionnaireService.getQuestionnaire(this.token, id).subscribe(
        response => {
          if (!response.questionnaire) {
            this._router.navigate(['/']);
          } else {
            this.questionnaire = response.questionnaire;
            console.log('ttt' + this.questionnaire = response.questionnaire);
            /*
            //sacer el Examen
            this._examService.getExam(this.token, response.questionnaire.exam).subscribe(
              response => {
                if (!response.exam) {
                  this.alertMessage = 'El cuestionario no tiene un examen asociado';
                } else {
                  this.exam = response.exam;
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
            //sacar las preguntas
            this._questionService.getQuestions(this.token, response.questionnaire.question[0]).subscribe(
              response => {
                if (!response.question) {
                  this.alertMessage = 'Este cuestionario no tine preguntas';
                } else {
                  this.questions = response.questions;
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
            */
            //response.questionnaire.question

            //sacar las respuesta
            var d = this.questionnaire = response.questionnaire;
            console.log('hy '+ this.questionnaire.question._id);

            this._answerService.getAnswer(this.token, d[1]).subscribe(
              response => {
                if (!response.answer) {
                  this.alertMessage = 'Las preguntas no tienen respuestas';
                } else {
                  this.answer = response.answer;
                }
              },
              error => {
                var errorMessage = <any>error;

                if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  //this.alertMessage = body.message;
                  console.log(error);
                }
              });

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
    });
  }

  getAnswers(question){
    let id_question = question;
    this._answerService.getAnswers(this.token, id_question).subscribe(

      response => {
        if (!response.answers) {
          this._router.navigate(['/']);
        } else {
          //this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.answers = response.answers;
          console.log(this.answers);
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

  onSubmit(){

  }
}
