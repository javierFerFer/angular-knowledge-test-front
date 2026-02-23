import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-modal-wrapper',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule],
})
export class ModalWrapperComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  ngOnInit() {
    const componentToRender = this.route.data.pipe(take(1)).subscribe(({ componentToRender }) => {
      const dialogRef = this.dialog.open(componentToRender);
    });
  }
}
