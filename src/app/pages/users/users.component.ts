import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrl: 'users.component.css',
  standalone: true,
  imports: [UserFormComponent, UserTableComponent, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
