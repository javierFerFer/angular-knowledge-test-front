import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-ko',
  templateUrl: 'action-ko.component.html',
  standalone: true,
  imports: [MatSnackBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionKOComponent {}
