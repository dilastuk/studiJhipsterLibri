import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeasure } from '../measure.model';
import { MeasureService } from '../service/measure.service';
import { MeasureDeleteDialogComponent } from '../delete/measure-delete-dialog.component';

@Component({
  selector: 'jhi-measure',
  templateUrl: './measure.component.html',
})
export class MeasureComponent implements OnInit {
  measures?: IMeasure[];
  isLoading = false;

  constructor(protected measureService: MeasureService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.measureService.query().subscribe(
      (res: HttpResponse<IMeasure[]>) => {
        this.isLoading = false;
        this.measures = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMeasure): number {
    return item.id!;
  }

  delete(measure: IMeasure): void {
    const modalRef = this.modalService.open(MeasureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.measure = measure;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
