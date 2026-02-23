import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { userModel } from '../services/users-api.service';
import { UsersService } from '../services/users.service';

@Injectable({ providedIn: 'root' })
export class UserIdResolver implements Resolve<userModel> {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  resolve(route: ActivatedRouteSnapshot): Observable<userModel> | Promise<userModel> | userModel {
    const id = route.params['id'];
    return this.usersService.findUserById(id).pipe(
      catchError((err) => {
        return of(err).pipe(
          tap(() => {
            this.router.navigate(['']);
          }),
        );
      }),
    );
  }
}
