import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question';
import { AppComponent } from '../app.component';

@Component({
  selector: 'question-table',
  templateUrl: '../views/question-table.html',
  providers: [UserService, QuestionService]
})

export class QuestionTableComponent implements OnInit {

  public titulo: string;
  public questions: Question[];
  public identity;
  public token;
  public url: string;
  public confirmado;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService
  ) {
    this.titulo = 'Preguntas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargando el componente de question-tables.ts');
    this.getQuestionsList();
  }

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

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelQuestion() {
    this.confirmado = null;
  }

  onDeleteQuestion(id) {
    this._questionService.deleteQuestion(this.token, id).subscribe(
      response => {
        if (!response.question) {
          //alert('Error en el servidor');
          alert('Pregutna Elimindada');
        }
        this.getQuestionsList();
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
