// tslint:disable-next-line: ordered-imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../modelo/usuario';
import {Servicio} from './servicio';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentAgremiadoSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentAgremiado: Observable<User>;

    constructor(
        public servicio:    Servicio,
        private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentAgremiadoSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentAgremiado')||'{}'));
        this.currentAgremiado = this.currentAgremiadoSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentAgremiadoValue(): User {
        return this.currentAgremiadoSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.servicio.url_global +    'web_service/LoginUsuarioWeb', { 'usuario':username,'clave': password })
            .pipe(map(user => {
                console.log(user.Token);
                if (user && user.Token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }   else {
                }
                return user;
            }));
    }


    public loginagremiados(clavecap: string, dni: string, nrocap: string) {
        return this.http.post<any>(this.servicio.url_global +    'venta/registroventa', { clavecap, dni, nrocap })
            .pipe(map(  (user) => {
                if (user && user.Token) {
                    localStorage.setItem('currentAgremiado', JSON.stringify(user));
                    this.currentAgremiadoSubject.next(user);
                }   else {

                }
                return user;
            }));
    }

    consultar(expediente: string, correo: string) {
        return this.http.post<any>(this.servicio.url_global +    '/web_service/ConsultarExpediente', { expediente, correo })
            .pipe(map((user) => {
                console.log(user.Token1);
                if (user && user.Token1) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }   else {
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null as any);
    }

    logoutAgremiado() {
        localStorage.removeItem('currentAgremiado');
        this.currentAgremiadoSubject.next(null as any);
    }
}
