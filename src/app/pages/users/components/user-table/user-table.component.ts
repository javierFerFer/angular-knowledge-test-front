import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, finalize, of, switchMap, take } from 'rxjs';
import {
  AreYouSureComponent,
  modalBaseActionResponseEnum,
} from '../../../../components/modals/are-you-sure/are-you-sure.component';
import { SnackBarService } from '../../../../services/snackbar.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: 'user-table.component.html',
  styleUrl: 'user-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackBarService);

  dataSource = this.usersService.usersList;
  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability', 'actions'];

  showDetails(id: number) {
    this.router.navigate(['details', id], { relativeTo: this.route });
  }

  showEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  deleteElement(id: number) {
    const dialogRef = this.dialog.open(AreYouSureComponent);

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((action) => {
          if (action === modalBaseActionResponseEnum.YES) {
            return this.usersService.deleteUserById(id).pipe(
              take(1),
              catchError(() => {
                this.snackbarService.openKoAction();
                return EMPTY;
              }),
              finalize(() => {
                this.snackbarService.openOkAction();
              }),
            );
          }
          return of(action);
        }),
      )
      .subscribe();
  }
}
