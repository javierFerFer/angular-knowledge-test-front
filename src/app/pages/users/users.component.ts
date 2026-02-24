import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrl: 'users.component.css',
  standalone: true,
  imports: [UserTableComponent, RouterOutlet, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  navigateToCreateNewUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
