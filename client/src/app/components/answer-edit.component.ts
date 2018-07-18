import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AnswerService } from '../services/answer.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { AppComponent } from '../app.component';

@Component({
  selector: 'answer-edit',
  templateUrl: '../views/answer-add.html',
  providers: [UserService, AnswerService]
})

export class AnswerEditComponent implements OnInit {

  public titulo: string;
  public question: Question;
  public answer: Answer;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit = true;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _answerService: AnswerService
  ) {
    this.titulo = 'Editar respuesta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.answer = new Answer('', false,'');
  }

  ngOnInit() {
    console.log('cargando el componente de answer-edit.component.ts');
    //Consegir la respuesta
    this.getAnswer();

  }

  getAnswer(){
    this._route.params.forEach((params: Params) => {
       let id = params['id'];
       this._answerService.getAnswer(this.token, id).subscribe(
         response => {
           if(!response.answer){
             this._router.navigate(['/']);
           }else{
             this.answer= response.answer;
           }

         },
         error => {
           var errorMessage = <any>error;
           if(errorMessage != null){
             var body = JSON.parse(error._body);
             console.log(error);
           }

         }
       );
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._answerService.editAnswer(this.token, id, this.answer).subscribe(
        response => {
          if(!response.answer){
            this.alertMessage = "ERROR en el servidor";
          }else{
            this.alertMessage = '¡La respuesta fue actualizada correctamente!';
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
