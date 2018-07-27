import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileInfoNotificationComponent } from './profile-info-notification/profile-info-notification.component';
import { RawlinkComponent } from './rawlink/rawlink.component';
import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ThemeAddComponent } from './components/theme-add.component';
import { ThemeEditComponent } from './components/theme-edit.component';
import { ThemeTableComponent } from './components/theme-table.component';
import { QuestionTableComponent } from './components/question-table.component';
import { QuestionAddComponent } from './components/question-add.component';
import { QuestionEditComponent } from './components/question-edit.component';
import { AnswerAddComponent } from './components/answer-add.component';
import { AnswerEditComponent } from './components/answer-edit.component';
import { AnswerTableComponent } from './components/answer-table.component';
import { ExamAddComponent } from './components/exam-add.component';
import { ExamTableComponent } from './components/exam-table.component';
import { ExamEditComponent } from './components/exam-edit.component';
import { QuestionnaireAddComponent } from './components/questionnaire-add.component';
import { QuestionnaireTableComponent } from './components/questionnaire-table.component';
import { QuestionnaireDetailComponent } from './components/questionnaire-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileInfoNotificationComponent,
    RawlinkComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    ThemeAddComponent,
    ThemeEditComponent,
    ThemeTableComponent,
    QuestionTableComponent,
    QuestionAddComponent,
    QuestionEditComponent,
    AnswerAddComponent,
    AnswerEditComponent,
    AnswerTableComponent,
    ExamAddComponent,
    ExamTableComponent,
    ExamEditComponent,
    QuestionnaireAddComponent,
    QuestionnaireTableComponent,
    QuestionnaireDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
