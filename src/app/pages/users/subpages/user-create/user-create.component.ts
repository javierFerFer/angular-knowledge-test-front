import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { AppStateService } from '../../../../services/app-state.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { UsersService } from '../../../../services/users.service';

export type SeniorityOptions = 'junior' | 'senior';

@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
  styleUrl: 'user-create.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent implements OnInit {
  protected seniorityOptions: SeniorityOptions[] = ['junior', 'senior'];
  protected availabilityOptions: boolean[] = [true, false];

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private appStateService = inject(AppStateService);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);

  protected form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    seniority: [this.seniorityOptions[0], Validators.required],
    yearsOfExperience: [0, Validators.required],
    availability: [false, Validators.required],
  });

  protected readonly loadingState = this.appStateService.loadingState;

  ngOnInit(): void {
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['../']);
      });
  }

  create() {
    const formData = this.form.getRawValue();
    this.usersService
      .createNewUser({
        name: formData.name!,
        availability: formData.availability!,
        seniority: formData.seniority!,
        surname: formData.surname!,
        yearsOfExperience: formData.yearsOfExperience!,
      })
      .pipe(
        take(1),
        catchError(() => {
          this.snackBarService.openKoAction();
          return EMPTY;
        }),
        finalize(() => {
          this.dialogRef.close();
        }),
      )
      .subscribe(() => {
        this.snackBarService.openOkAction();
      });
  }
}
