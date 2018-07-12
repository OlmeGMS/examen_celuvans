import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})

export class UserEditComponent implements OnInit {

  public titulo: string;
  public user: User;
  public identity;
  public token;
  public url: string;

  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('user-edit cargado');

  }

  onSubmit() {
    console.log(this.user);
    /*
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = 'El usuario no se ha podido actualizar';
        } else {
          //this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById("identity_name").innerHTML = this.user.name;

          if (!this.filesToUpload) {
            //redireccion
          } else {
            this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload).then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));

                let image_path = this.url + 'get-image-user/' + this.user.image;
                document.getElementById('image-logged').setAttribute('src', image_path);
              }
            );
          }

          this.alertMessage = 'Datos actualizados correctamente';
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
    */
  }
}
