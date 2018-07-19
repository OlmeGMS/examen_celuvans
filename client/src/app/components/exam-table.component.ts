import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam';
import { AppComponent } from '../app.component';

@Component({
  selector: 'exam-tablet',
  templateUrl: '../views/exam-tablet.html',
  providers: [UserService, ExamService]
})

export class ExamTableComponent implements OnInit {

  public titulo: string;
  public exams: Exam[];
  public identity;
  public token;
  public url: string;
  public confirmado;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _examService: ExamService
  ) {
    this.titulo = 'Examenes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargando el componente de exam-tables.ts');
    this.getListExams();
  }

  getListExams() {

    //this._route.params.forEach((params: Params) => {
    console.log('tokens hhhh ' + this.token);
    this._examService.getListExams(this.token).subscribe(

      response => {
        if (!response.exams) {
          this._router.navigate(['/']);
        } else {
          //this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.exams = response.exams;
          console.log(this.exams);
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

  onCancelExam() {
    this.confirmado = null;
  }

  onDeleteExam(id) {
    this._examService.deleteExam(this.token, id).subscribe(
      response => {
        if (!response.exam) {
          alert('Error en el servidor');
          //alert('Pregutna Elimindada');
        }
        this.getListExams();
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
