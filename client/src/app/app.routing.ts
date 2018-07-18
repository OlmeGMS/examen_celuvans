import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { RegisterComponent } from './register/register.component';

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




const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'preguntas', component: QuestionTableComponent},
  {path: 'crear-pregunta', component: QuestionAddComponent},
  {path: 'editar-pregunta/:id', component: QuestionEditComponent},
  {path: 'crear-respuesta/:question', component: AnswerAddComponent},
  {path: 'editar-respuesta/:id', component: AnswerEditComponent},
  {path: 'respuestas', component: AnswerTableComponent},
  {path: 'crear-examen', component: ExamAddComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
