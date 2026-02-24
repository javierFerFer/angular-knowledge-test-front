import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from '../../../services/app-state.service';

export enum modalBaseActionResponseEnum {
  YES = 'yes',
  NO = 'no',
}

@Component({
  selector: 'app-are-you-sure',
  templateUrl: 'are-you-sure.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreYouSureComponent {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly appStateService = inject(AppStateService);
  protected readonly loadingState = this.appStateService.loadingState;

  onNoClick() {
    this.dialogRef.close(modalBaseActionResponseEnum.NO);
  }

  onYesClick() {
    this.dialogRef.close(modalBaseActionResponseEnum.YES);
  }
}
