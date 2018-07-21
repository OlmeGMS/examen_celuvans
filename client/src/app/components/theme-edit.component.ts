import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme';
import { AppComponent } from '../app.component';

@Component({
  selector: 'theme-edit',
  templateUrl: '../views/theme-add.html',
  providers: [UserService, ThemeService]
})

export class ThemeEditComponent implements OnInit {

  public titulo: string;
  public theme: Theme;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit = true;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _themeService: ThemeService
  ) {
    this.titulo = 'Editar Tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.theme = new Theme('');
  }

  ngOnInit() {
    console.log('cargando el componente de theme-edit.component.ts');
    //Consegir la respuesta
    this.getTheme();

  }

  getTheme(){
    this._route.params.forEach((params: Params) => {
       let id = params['id'];
       this._themeService.getTheme(this.token, id).subscribe(
         response => {
           if(!response.theme){
             this._router.navigate(['/']);
           }else{
             this.theme= response.theme;
           }

         },
         error => {
           var errorMessage = <any>error;
           if(errorMessage != null){
             var body = JSON.parse(error._body);
             console.log(error);
           }

         }
       );
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._themeService.editTheme(this.token, id, this.theme).subscribe(
        response => {
          if(!response.theme){
            this.alertMessage = "ERROR en el servidor";
          }else{
            this.alertMessage = '¡El tema fue actualizado correctamente!';
            this.theme = response.theme;
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
    });

  }


}
