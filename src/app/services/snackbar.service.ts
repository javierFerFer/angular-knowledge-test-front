import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionOKComponent } from '../components/snack-bars/acion-ok/action-ok.component';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  openOkAction() {
    this.snackBar.openFromComponent(ActionOKComponent, {
      duration: 5000,
    });
  }

  openKoAction() {
    this.snackBar.openFromComponent(ActionOKComponent, {
      duration: 5000,
    });
  }
}
