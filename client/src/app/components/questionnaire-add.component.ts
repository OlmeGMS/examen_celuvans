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
  public answers: Answer[];
  public answer: Answer;
  public exams: Exam[];
  public exam: Exam;
  public examid: Exam;
  public questionnaire: Questionnaire;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public id_exma = null;
  public preguntas = [];
  public canQuestion;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _examService: ExamService,
    private _questionnaireService: QuestionnaireService

  ){
    this.titulo = 'Crear Cuestionario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.questionnaire = new Questionnaire('','');
    this.exam = new Exam('', '','', '', '');
    this.canQuestion = null;
    this.examid = null;

  }

  ngOnInit(){
    console.log('cargado el componente de questionnaire-add.component.ts');
    this.getListExams();
    //this.getQuestionsTheme();
    //this.getQuestionsTheme();
  }
  public devices = 'one two three'.split(' ');
  public selectedDevice = 'two';
  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
    // ... do other stuff here ...
}
/*
selectionChange(input: HTMLInputElement) {

    console.log(input);
    console.log(input.name);
}
*/
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



  getQuestionsTheme(id_exam){
    console.log(id_exam);
    this._examService.getExam(this.token, id_exam).subscribe(
      response => {
        if (!response.exam) {
          this._router.navigate(['/']);
        } else {

          this.examid = response.exam;
          var exam_theme = this.examid.theme;

              this._questionService.getQuestionsTheme(this.token, exam_theme).subscribe(

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
    var seledExam = this.questionnaire.exam;
    this._examService.getExam(this.token, seledExam).subscribe(
      response => {
          if(!response.exam){
            this._router.navigate(['/']);
          }else{
            this.exam = response.exam;

            this.canQuestion = this.exam.cant;
            var exam_can = this.exam.cant;
            var ques = this.questionnaire.question.length;
            var pre = ques.toString();

            if(pre == exam_can){
              this._questionnaireService.addQuestionnaire(this.token, this.questionnaire).subscribe(
                response => {
                  if(!response.questionnaire){
                    this.alertMessage = "ERROR en el servidor";
                  }else{
                    this.alertMessage = '¡El cuestionario fue creado correctamente!';
                    this.questionnaire = response.questionnaire;
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
            }else{
              this.alertMessage = '¡La cantidad de preguntas seleccionadas no coinciden con las registradas en el examen!';
            }

          }
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);

      }
    }
    );

    console.log(this.exam.cant);




  }
}
