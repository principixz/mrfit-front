import { Component } from '@angular/core';
import {Servicio} from '../servicio/servicio';
import { AlertService, AuthenticationService } from '../servicio/';
import { first } from 'rxjs/operators';
import { User } from '../modelo/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  returnUrl: string='';
  loginform: FormGroup;  
  boton_disabled=true;
  boton_texto="Iniciar Sesion";
  constructor(  
    private loadingBar: LoadingBarService,
   private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private servicio:Servicio,
    public formbuilder:FormBuilder) {
     
    this.loginform = this.formbuilder.group({
      usuario: ['',[   Validators.required,]],
      clave: ['',[   Validators.required,]],
    
    });

           


     }

     ngOnInit() {
     if (this.authenticationService.currentUserValue) { 
      let info:any;
      info=this.authenticationService.currentUserValue;
      console.log(info); 
     let url=info["url_inicial"];
     this.router.navigate([url]);
   }
  
   
    
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //  console.log(this.returnUrl);
  
    }
  onSubmit() {

    this.boton_disabled=false;
    this.boton_texto="Iniciando...";
   var _this=this;
    var json={};
 
   json=this.loginform.value;
//   this.emitStart();
    //this.loading=true;
    this.loadingBar.start();
  this.authenticationService.login(this.loginform.value["usuario"], this.loginform.value["clave"],)
    .pipe(first())
    .subscribe(
        data => {
          if (this.authenticationService.currentUserValue) { 

            //alert(this.returnUrl);
            let info:any;
             info=this.authenticationService.currentUserValue;
             console.log(info);
            let url=info["url_inicial"];
            this.router.navigate([url]);

            }else{
              alert("error al iniciar sesión");
            //  this.loading = false;

            }

            _this.boton_disabled=true;
            _this.boton_texto="Iniciar Sesion";
            _this.loadingBar.complete();
          //  this.emitComplete();
          //  this.emitReset();
        },
        error => {
           // this.alertService.error(error);
          // this.emitComplete();

          _this.boton_disabled=true;
          _this.boton_texto="Iniciar Sesion";
          _this.loadingBar.complete();
      
        });







  }
 }
