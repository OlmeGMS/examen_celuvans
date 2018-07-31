import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { AppComponent } from '../app.component';

@Component({
  selector: 'answer-table',
  templateUrl: '../views/answer-tablet.html',
  providers: [UserService, QuestionService, AnswerService ]
})

export class AnswerTableComponent implements OnInit {

  public titulo: string;
  public questions: Question[];
  public answers: Answer[];
  public identity;
  public token;
  public url: string;
  public confirmado;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService
  ) {
    this.titulo = 'Respuestas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargando el componente de answer-tables.ts');
    this.getListAnswers();
  }

  getListAnswers(){

    this._answerService.getListAnswers(this.token).subscribe(

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

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelAnswer() {
    this.confirmado = null;
  }

  onDeleteAnswer(id) {
    this._answerService.deleteAnswer(this.token, id).subscribe(
      response => {
        if (!response.answer) {
          //alert('Error en el servidor');
          alert('Respuesta Elimindada');
        }
        this.getListAnswers();
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
