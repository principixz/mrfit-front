import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Servicio} from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-clientenew',
  templateUrl: './clientenew.component.html',
  styleUrls: ['./clientenew.component.css']
})
export class ClientenewComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {}
}

