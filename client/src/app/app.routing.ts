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
  {path: 'registro', component: RegisterComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
