import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme';
import { AppComponent } from '../app.component';

@Component({
  selector: 'theme-add',
  templateUrl: '../views/theme-add.html',
  providers: [UserService, ThemeService]
})

export class ThemeAddComponent implements OnInit {

  public titulo: string;
  public theme: Theme;
  public identity;
  public token;
  public url: string;
  public alertMessage;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _themeService: ThemeService,
  ) {
    this.titulo = 'Crear tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.theme = new Theme('');
  }

  ngOnInit() {
    console.log('cargando el componente de theme-add.component.ts');
    // Llamar al metodo del api para sacar una pregunta en base de a su id en getQuestion

  }

  onSubmit(){
      console.log(this.theme);

      this._themeService.addTheme(this.token, this.theme).subscribe(
        response => {
          if(!response.theme){
            this.alertMessage = "ERROR en el servidor";
          }else{
            this.alertMessage = '¡El tema fue creado correctamente!';
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


  }


}
