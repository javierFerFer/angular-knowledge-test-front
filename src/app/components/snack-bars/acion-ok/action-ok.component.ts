import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-ok',
  templateUrl: 'action-ok.component.html',
  standalone: true,
  imports: [MatSnackBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionOKComponent {}
