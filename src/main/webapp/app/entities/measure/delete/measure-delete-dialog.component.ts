import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeasure } from '../measure.model';
import { MeasureService } from '../service/measure.service';

@Component({
  templateUrl: './measure-delete-dialog.component.html',
})
export class MeasureDeleteDialogComponent {
  measure?: IMeasure;

  constructor(protected measureService: MeasureService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.measureService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
