import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme';
import { AppComponent } from '../app.component';

@Component({
  selector: 'theme-table',
  templateUrl: '../views/theme-table.html',
  providers: [UserService, ThemeService ]
})

export class ThemeTableComponent implements OnInit {

  public titulo: string;
  public themes: Theme[];
  public identity;
  public token;
  public url: string;
  public confirmado;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _themeService: ThemeService,

  ) {
    this.titulo = 'Temas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargando el componente de theme-tables.ts');
    this.getListThemes();
  }

  getListThemes(){

    this._themeService.getThemeList(this.token).subscribe(

      response => {
        if (!response.themes) {
          this._router.navigate(['/']);
        } else {
          //this.alertMessage = '¡La pregunta fue creada correctamente!';
          this.themes = response.themes;
          console.log(this.themes);
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }

      }
    );



  }

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelTheme() {
    this.confirmado = null;
  }

  onDeleteTheme(id) {
    this._themeService.deleteTheme(this.token, id).subscribe(
      response => {
        if (!response.answer) {
          //alert('Error en el servidor');
          alert('Tema Elimindado');
        }
        this.getListThemes();
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }

      }
    );
  }


}
