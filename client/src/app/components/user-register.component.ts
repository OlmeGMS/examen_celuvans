import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-register.html',
  providers: [UserService]
})

export class UserRegisterComponent implements OnInit {

  public titulo: string;
  public user_register: User;
  public url: string;
  public errorMessage;

  constructor(
    private _userService: UserService
  ){
    this.titulo = 'Registro';
    //this.identity = this._userService.getIdentity();
    //this.token = this._userService.getToken();
    //this.user = this.identity;
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '', '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('user-register cargado');
  }

  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          alert('ERROR al registrase');
        }else{

        }


      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

          console.log(error);
        }
      }
    );
  }


}
