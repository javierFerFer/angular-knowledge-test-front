import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  protected dialogRef = inject(MatDialogRef);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  protected selectedUser = this.usersService.selectedUser;

  ngOnInit(): void {
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['../']);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
