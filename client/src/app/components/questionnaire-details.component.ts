import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { ExamService } from '../services/exam.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QualificationService } from '../services/qualification.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Exam } from '../models/exam';
import { Qualification } from '../models/qualification';
import { Questionnaire } from '../models/questionnaire';
import { AppComponent } from '../app.component';

@Component({
  selector: 'questionnaire-details',
  templateUrl: '../views/questionnaire-details.html',
  providers: [UserService, QuestionService, AnswerService, ExamService, QuestionnaireService,  QualificationService ]
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
  public radioSel:any;
  public radioSelected:string;
  public radioSelectedString:string;
  public radio:Array<any> ;
  public calificacion: number;
  public pru: Answer[] = [];
  public qualification: Qualification;
  //public respuestas: Answer[];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _examService: ExamService,
    private _questionnaireService: QuestionnaireService,
    private _qualificationService: QualificationService,
  ) {
    this.titulo = 'Questionario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.qualification = new Qualification('','',0,0);

        //Selecting Default Radio item here

  }

  ngOnInit() {
    console.log('cargado el component de questionnaire-details.component.ts');
    this.getQuestionnaire();

  }

  getQuestionnaire() {
  this._route.params.forEach((params: Params) => {
      //let params: Params;
      let id = params['id'];

      this._questionnaireService.getQuestionnaire(this.token, id).subscribe(
        response => {
          if (!response.questionnaire) {
            this._router.navigate(['/']);
          } else {
            this.questionnaire = response.questionnaire;
            console.log(this.questionnaire = response.questionnaire);

            //sacar las respuesta

            var d = this.questionnaire = response.questionnaire;
            console.log('esto');
            console.log(d);
            var dq = d.question;
            console.log('estoss');
            console.log(dq);
            var count_dqd = dq.length;
            //var dqd = [0]._id;
            console.log('didi');
            //console.log(dqd);
            console.log('yuyu');
            console.log(count_dqd);
            console.log('poi');
            console.log(dq._id);




        //    dq.forEach((element) => {
              //console.log(element);
              console.log('o');
              //console.log(element._id);
              console.log(dq);

            //  var id_question = element._id;
              var ttw = null;
              var ttww = null;


              this._answerService.getAnswers(this.token, dq._id).subscribe(

                response => {
                  if (!response.answers) {
                    this._router.navigate(['/']);
                    //console.log('naranjas');
                  } else {
                    //this.alertMessage = '¡La pregunta fue creada correctamente!';
                    console.log('ujm');
                    //this.answers = response.answers;
                    ttw = response.answers;
                    this.answers = ttw;
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
            //  this.answers = null;
          //  });




            //var id_question = "5b59dd786b9afc09581869f6";




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

onSelectionChange(entry) {
        //this.questionnaire = entry;

        //console.log(entry);
        this.pru.push(entry);


        this.radio = entry;



        console.log(this.pru);
        //console.log(this.radio);


    }

radioFun(entry){
  console.log('trelo');
  console.log('trelo');
}
onSubmit() {
console.log(this.questionnaire);
var count_pru = this.pru.length;
console.log(count_pru);
var calif = 0;
var nota = 0;
var yu  = null;
for (var i = 0; i < count_pru; i++) {
  yu = this.pru[i];
  if(yu === true){
    calif = calif + 5;
  }

}
nota = calif/count_pru;
console.log(nota);

var id_user = this.identity._id;
console.log(id_user);
this.qualification.exam = this.questionnaire.exam;
this.qualification.user = id_user;

this.qualification.score = nota;
this.qualification.intent = 1;
console.log(this.qualification);
console.log(this.identity);
console.log(this.identity._id);

this._qualificationService.addQualification(this.token, this.qualification).subscribe(
  response => {
    if(!response.qualification){
      this.alertMessage = "Error en el servidor";
    }else{
      this.alertMessage = '¡La respuesta fue creada correctamente!';
      this._router.navigate(['/']);

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
