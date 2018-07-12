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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileInfoNotificationComponent,
    RawlinkComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent
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
