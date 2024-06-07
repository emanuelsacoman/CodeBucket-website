import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../model/services/auth.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService,
    public router: Router,
    private toast: NgToastService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['']);
      this.toast.error({
        detail: "Erro",
        summary: "Acesso Negado!",
        duration: 5000
    });
    }
    return true;
  }
}