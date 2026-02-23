import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UsersService } from '../../../../services/users.service';
import { SeniorityOptions } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrl: 'user-edit.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
  protected seniorityOptions: SeniorityOptions[] = ['junior', 'senior'];
  protected availabilityOptions: boolean[] = [true, false];

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly router = inject(Router);

  protected form = this.fb.group({
    name: [this.usersService.selectedUser()?.name, Validators.required],
    surname: [this.usersService.selectedUser()?.surname, Validators.required],
    seniority: [this.usersService.selectedUser()?.seniority, Validators.required],
    yearsOfExperience: [this.usersService.selectedUser()?.yearsOfExperience, Validators.required],
    availability: [this.usersService.selectedUser()?.availability, Validators.required],
  });

  ngOnInit(): void {
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['../']);
      });
  }

  edit() {
    // CONTINUE HERE
    //     const formData = this.form.getRawValue();
    //     this.usersService
    //       .createNewUser({
    //         name: formData.name!,
    //         availability: formData.availability!,
    //         seniority: formData.seniority!,
    //         surname: formData.surname!,
    //         yearsOfExperience: formData.yearsOfExperience!,
    //       })
    //       .pipe(take(1))
    //       .subscribe();
  }
}
