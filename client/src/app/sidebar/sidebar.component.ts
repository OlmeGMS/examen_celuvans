import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, AppComponent ]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public url: string;
  public appComponent;

  constructor(

    private _userService: UserService,
    private _appComponent: AppComponent
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
  }

  logoutC(){
    this.appComponent = this._appComponent.logout();
  }



}
