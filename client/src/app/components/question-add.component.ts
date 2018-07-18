import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question';
import { AppComponent } from '../app.component';

@Component({
  selector: 'question-add',
  templateUrl: '../views/question-add.html',
  providers: [UserService, QuestionService]
})

export class QuestionAddComponent implements OnInit{

  public titulo: string;
  public question: Question;
  public identity;
  public token;
  public url: string;
  public alertMessage;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService
  ){
    this.titulo = 'Añadir nueva pregunta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.question = new Question('');
  }

  ngOnInit(){
     console.log('cargando el componente de question-add.component.ts');

  }

  onSubmit(){
    console.log(this.question);

    this._questionService.addQuestion(this.token, this.question).subscribe(
      response => {
        if(!response.question){
          this.alertMessage = "ERROR en el servidor";
        }else{
          this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.question = response.question;
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
    
  }

}
