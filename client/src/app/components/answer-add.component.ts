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
  selector: 'answer-add',
  templateUrl: '../views/answer-add.html',
  providers: [UserService, QuestionService, AnswerService]
})

export class AnswerAddComponent implements OnInit {

  public titulo: string;
  public question: Question;
  public answer: Answer;
  public identity;
  public token;
  public url: string;
  public alertMessage;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService
  ) {
    this.titulo = 'Crear respuesta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.answer = new Answer('', false,'');
  }

  ngOnInit() {
    console.log('cargando el componente de answer-add.component.ts');
    // Llamar al metodo del api para sacar una pregunta en base de a su id en getQuestion

  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let question_id = params['question'];
      this.answer.question = question_id;

      console.log(this.answer);

      this._answerService.addAnswer(this.token, this.answer).subscribe(
        response => {
          if(!response.answer){
            this.alertMessage = "ERROR en el servidor";
          }else{
            this.alertMessage = '¡La respuesta fue creada correctamente!';
            this.answer = response.answer;

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
