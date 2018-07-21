import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { ThemeService } from '../services/theme.service';
import { UploadService } from '../services/upload.service';
import { Question } from '../models/question';
import { Theme }  from '../models/theme';
import { AppComponent } from '../app.component';

@Component({
  selector: 'question-edit',
  templateUrl: '../views/question-add.html',
  providers: [UserService, QuestionService, ThemeService]
})

export class QuestionEditComponent implements OnInit {

  public titulo: string;
  public question: Question;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService
  ) {
    this.titulo = 'Editar pregunta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.question = new Question('','');
    this.is_edit = true;
  }

  ngOnInit() {
    console.log('cargando el componente de question-add.component.ts');
    // Llamar al metodo del api para sacar una pregunta en base de a su id en getQuestion

  }

  getQuestion() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._questionService.getQuestion(this.token, id).subscribe(
        response => {
          if (!response.question) {
            this._router.navigate(['/']);
          } else {
            //this.alertMessage = '¡La pregunta fue creada correctamente!';
            this.question = response.question;
          }

        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }

        }
      );
    });
  }

  onSubmit() {
    console.log(this.question);

    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._questionService.editQuestion(this.token, id, this.question).subscribe(
        response => {
          if (!response.question) {
            this.alertMessage = "ERROR en el servidor";
          } else {
            this.alertMessage = '¡La pregunta fue actualizada correctamente!';
            //this.question = response.question;
          }

        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }

        }
      );

    });

  }
}
