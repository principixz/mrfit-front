
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { MenuConfService } from '../menu-conf.service';
import { Roles } from '../roles.enum';
import { Modes as SidebarModes } from 'angular-sidebar-menu';
import {Servicio} from '../servicio/servicio';
import {AuthenticationService} from '../servicio/authentication.service';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError  } from '@angular/router';

import {Notificacion} from './../modelo/notificacion';

import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ElementRef,ViewChild,ViewChildren, QueryList, AfterViewInit } from '@angular/core';
export interface Menu {
  
  titulo:string;
  url:String;
  estado:boolean;
  submenu:Menu[];
  tipo:number;
}
export interface Section {
  name: string;
  updated: Date;
}

export interface Categoria{
  id:number;
  descripcin:string;
  estado:boolean;
}


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`]
})
export class PrincipalComponent implements OnInit {
  title = 'angular-sidebar-menu';
  roles = Roles;
  currentRole = Roles.EDITOR;
  sidebarModes = SidebarModes;
  currentSidebarMode = SidebarModes.EXPANDED;
  lang = this.translationService.getDefaultLang();
  currentSearch?: string;
  inputSearchFocus = false;
  mainNavigationOpened = true;
  cantidad_notificaciones=0;
  myDrop!:NgbDropdown;
  date!: Date;
  listanotificacion:Notificacion[]=[
  ];
  estado_barra=true;
  @ViewChild('mainfocus', { read: ElementRef }) mainfocus!:ElementRef;

  constructor(private route: ActivatedRoute,private deviceService: DeviceDetectorService,
    private router: Router,  private authenticationService: AuthenticationService,public servicio:Servicio,public menuConfService: MenuConfService, private translationService: TranslocoService) {
      this.epicFunction();

  

     }
  onLangChange(event: MatSelectChange): void {
    this.translationService.setActiveLang(event.value);
  }
  
  deviceInfo !:any;
  epicFunction() {
    let _this=this;
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(isTablet || isMobile){
      this.mainNavigationOpened=false;
    }
    

    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
          console.log(event);

      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          console.log(event); 
          _this.deviceInfo = _this.deviceService.getDeviceInfo();
          const isMobile = _this.deviceService.isMobile();
          const isTablet = _this.deviceService.isTablet();
          const isDesktopDevice = _this.deviceService.isDesktop();
          if(isTablet || isMobile){
            setTimeout(() => {
              _this.mainNavigationOpened=false;
           
            
            }, 100);

            //setTimeout(() => {   _this.mainfocus.nativeElement.focus();alert();},200);
          }

      }

     /* if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }*/
  });

  }
  items: MenuItem[]=[];
  visibleSidebar1: any;
  ADMIN:any;
 search:any;    
   menu1 :any;

   aumntar()
   {
    this.cantidad_notificaciones++;
   }
  ngOnInit() {
    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('web_service/cargar_menu',{},token).pipe().subscribe((response)=>{ 
      this.menu1=response;
      
      
   });
 
}    

public salir() {
  this.authenticationService.logout();
  this.router.navigate(['']);
  }


}