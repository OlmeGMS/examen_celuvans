import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ExamService } from '../services/exam.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam';
import { AppComponent } from '../app.component';

@Component({
  selector: 'exam-edit',
  templateUrl: '../views/exam-add.html',
  providers: [UserService, ExamService]
})

export class ExamEditComponent implements OnInit {

  public titulo: string;
  public question: Question;
  public answer: Answer;
  public exam: Exam;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit = true;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _examService: ExamService
  ) {
    this.titulo = 'Editar examen';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.exam = new Exam('', '','', '');
  }

  ngOnInit() {
    console.log('cargando el componente de exam-edit.component.ts');
    //Consegir la respuesta
    this.getExam();

  }

  getExam(){
    this._route.params.forEach((params: Params) => {
       let id = params['id'];
       this._examService.getExam(this.token, id).subscribe(
         response => {
           if(!response.exam){
             this._router.navigate(['/']);
           }else{
             this.exam = response.exam;
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

      this._examService.editExam(this.token, id, this.exam).subscribe(
        response => {
          if(!response.exam){
            this.alertMessage = "ERROR en el servidor";
          }else{
            this.alertMessage = '¡El examen fue actualizado correctamente!';
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
