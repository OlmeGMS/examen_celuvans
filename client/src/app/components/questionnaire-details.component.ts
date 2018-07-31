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
  selector: 'questionnaire-details',
  templateUrl: '../views/questionnaire-details.html',
  providers: [UserService, QuestionService, AnswerService, ExamService, QuestionnaireService]
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
  //public respuestas: Answer[];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _examService: ExamService,
    private _questionnaireService: QuestionnaireService
  ) {
    this.titulo = 'Questionario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

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
        this.radio = entry;



        //console.log('plo');
        console.log(this.radio);


    }

radioFun(entry){
  console.log('trelo');
  console.log('trelo');
}
onSubmit() {
console.log(this.questionnaire);

}
}
