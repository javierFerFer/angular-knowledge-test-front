import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import {
  AreYouSureComponent,
  modalBaseActionResponseEnum,
} from '../../../../components/modals/are-you-sure/are-you-sure.component';
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
      .pipe(take(1))
      .subscribe((action) => {
        if (action === modalBaseActionResponseEnum.YES) {
          this.usersService.deleteUserById(id).pipe(take(1)).subscribe();
        }
      });
  }
}
