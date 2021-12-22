import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MeasureService } from '../service/measure.service';

import { MeasureComponent } from './measure.component';

describe('Measure Management Component', () => {
  let comp: MeasureComponent;
  let fixture: ComponentFixture<MeasureComponent>;
  let service: MeasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MeasureComponent],
    })
      .overrideTemplate(MeasureComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MeasureComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MeasureService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.measures?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
