import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMeasure, Measure } from '../measure.model';
import { MeasureService } from '../service/measure.service';
import { IBook } from 'app/entities/book/book.model';
import { BookService } from 'app/entities/book/service/book.service';
import { MeasureType } from 'app/entities/enumerations/measure-type.model';

@Component({
  selector: 'jhi-measure-update',
  templateUrl: './measure-update.component.html',
})
export class MeasureUpdateComponent implements OnInit {
  isSaving = false;
  measureTypeValues = Object.keys(MeasureType);

  booksSharedCollection: IBook[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    value: [],
    book: [],
  });

  constructor(
    protected measureService: MeasureService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ measure }) => {
      this.updateForm(measure);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const measure = this.createFromForm();
    if (measure.id !== undefined) {
      this.subscribeToSaveResponse(this.measureService.update(measure));
    } else {
      this.subscribeToSaveResponse(this.measureService.create(measure));
    }
  }

  trackBookById(index: number, item: IBook): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeasure>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(measure: IMeasure): void {
    this.editForm.patchValue({
      id: measure.id,
      type: measure.type,
      value: measure.value,
      book: measure.book,
    });

    this.booksSharedCollection = this.bookService.addBookToCollectionIfMissing(this.booksSharedCollection, measure.book);
  }

  protected loadRelationshipsOptions(): void {
    this.bookService
      .query()
      .pipe(map((res: HttpResponse<IBook[]>) => res.body ?? []))
      .pipe(map((books: IBook[]) => this.bookService.addBookToCollectionIfMissing(books, this.editForm.get('book')!.value)))
      .subscribe((books: IBook[]) => (this.booksSharedCollection = books));
  }

  protected createFromForm(): IMeasure {
    return {
      ...new Measure(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      value: this.editForm.get(['value'])!.value,
      book: this.editForm.get(['book'])!.value,
    };
  }
}
