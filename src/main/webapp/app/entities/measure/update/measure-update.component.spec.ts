jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MeasureService } from '../service/measure.service';
import { IMeasure, Measure } from '../measure.model';
import { IBook } from 'app/entities/book/book.model';
import { BookService } from 'app/entities/book/service/book.service';

import { MeasureUpdateComponent } from './measure-update.component';

describe('Measure Management Update Component', () => {
  let comp: MeasureUpdateComponent;
  let fixture: ComponentFixture<MeasureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let measureService: MeasureService;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MeasureUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(MeasureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MeasureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    measureService = TestBed.inject(MeasureService);
    bookService = TestBed.inject(BookService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Book query and add missing value', () => {
      const measure: IMeasure = { id: 456 };
      const book: IBook = { id: 91445 };
      measure.book = book;

      const bookCollection: IBook[] = [{ id: 97279 }];
      jest.spyOn(bookService, 'query').mockReturnValue(of(new HttpResponse({ body: bookCollection })));
      const additionalBooks = [book];
      const expectedCollection: IBook[] = [...additionalBooks, ...bookCollection];
      jest.spyOn(bookService, 'addBookToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ measure });
      comp.ngOnInit();

      expect(bookService.query).toHaveBeenCalled();
      expect(bookService.addBookToCollectionIfMissing).toHaveBeenCalledWith(bookCollection, ...additionalBooks);
      expect(comp.booksSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const measure: IMeasure = { id: 456 };
      const book: IBook = { id: 78516 };
      measure.book = book;

      activatedRoute.data = of({ measure });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(measure));
      expect(comp.booksSharedCollection).toContain(book);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Measure>>();
      const measure = { id: 123 };
      jest.spyOn(measureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ measure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: measure }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(measureService.update).toHaveBeenCalledWith(measure);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Measure>>();
      const measure = new Measure();
      jest.spyOn(measureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ measure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: measure }));
      saveSubject.complete();

      // THEN
      expect(measureService.create).toHaveBeenCalledWith(measure);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Measure>>();
      const measure = { id: 123 };
      jest.spyOn(measureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ measure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(measureService.update).toHaveBeenCalledWith(measure);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackBookById', () => {
      it('Should return tracked Book primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackBookById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
