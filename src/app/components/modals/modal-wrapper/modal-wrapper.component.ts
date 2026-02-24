import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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

  async ngOnInit() {
    const modalComponentPromise = this.route.snapshot.data['componentToRenderPromise'];

    const componentToRender = await modalComponentPromise();

    this.dialog.open(componentToRender);
  }
}
