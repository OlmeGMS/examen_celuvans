import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { RegisterComponent } from './register/register.component';

//import theme
import { ThemeAddComponent } from './components/theme-add.component';
import { ThemeEditComponent } from './components/theme-edit.component';
import { ThemeTableComponent } from './components/theme-table.component';

//import question
import { QuestionTableComponent } from './components/question-table.component';
import { QuestionAddComponent } from './components/question-add.component';
import { QuestionEditComponent } from './components/question-edit.component';


//import answer
import { AnswerAddComponent } from './components/answer-add.component';
import { AnswerEditComponent } from './components/answer-edit.component';
import { AnswerTableComponent } from './components/answer-table.component';

//import exam
import { ExamAddComponent } from './components/exam-add.component';
import { ExamTableComponent } from './components/exam-table.component';
import { ExamEditComponent } from './components/exam-edit.component';

//import questionnaire
import { QuestionnaireAddComponent } from './components/questionnaire-add.component';
import { QuestionnaireTableComponent } from './components/questionnaire-table.component';
import { QuestionnaireTableUserComponent } from './components/questionnaire-table-user.component';
import { QuestionnaireDetailComponent } from './components/questionnaire-details.component';

//import qualification
import { QualificationTableComponent } from './components/qualification-table-admin.component';
import { QualificationTableUserComponent } from './components/qualification-table-user.component';

//import mensaje
import { MessageComponent } from './message/message.component';
import { FullintentsComponent } from './fullintents/fullintents.component';




const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'crear-tema', component: ThemeAddComponent},
  {path: 'editar-tema/:id', component: ThemeEditComponent},
  {path: 'temas', component: ThemeTableComponent},
  {path: 'preguntas', component: QuestionTableComponent},
  {path: 'crear-pregunta', component: QuestionAddComponent},
  {path: 'editar-pregunta/:id', component: QuestionEditComponent},
  {path: 'crear-respuesta/:question', component: AnswerAddComponent},
  {path: 'editar-respuesta/:id', component: AnswerEditComponent},
  {path: 'respuestas', component: AnswerTableComponent},
  {path: 'crear-examen/:user', component: ExamAddComponent},
  {path: 'examenes', component: ExamTableComponent},
  {path: 'editar-examen/:id', component: ExamEditComponent},
  {path: 'crear-cuestionario', component: QuestionnaireAddComponent},
  {path: 'questionarios', component: QuestionnaireTableComponent},
  {path: 'questionarios-usuario', component: QuestionnaireTableUserComponent },
  {path: 'questionario-detalle/:id', component: QuestionnaireDetailComponent},
  {path: 'calificaciones-admin', component: QualificationTableComponent},
  {path: 'calificaciones-user/:id', component: QualificationTableUserComponent},
  {path: 'mensaje', component: MessageComponent},
  {path: 'full-intentos', component: FullintentsComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
