import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { take } from 'rxjs';
import { UsersService } from '../../../../services/users.service';

export type SeniorityOptions = 'junior' | 'senior';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrl: 'user-form.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  protected seniorityOptions: SeniorityOptions[] = ['junior', 'senior'];
  protected availabilityOptions: boolean[] = [true, false];

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  protected form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    seniority: [this.seniorityOptions[0], Validators.required],
    yearsOfExperience: [0, Validators.required],
    availability: [false, Validators.required],
  });

  saveNewUser() {
    const formData = this.form.getRawValue();
    this.usersService
      .createNewUser({
        name: formData.name!,
        availability: formData.availability!,
        seniority: formData.seniority!,
        surname: formData.surname!,
        yearsOfExperience: formData.yearsOfExperience!,
      })
      .pipe(take(1))
      .subscribe();
  }
}
