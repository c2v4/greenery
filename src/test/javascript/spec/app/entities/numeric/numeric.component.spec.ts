/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { NumericComponent } from 'app/entities/numeric/numeric.component';
import { NumericService } from 'app/entities/numeric/numeric.service';
import { Numeric } from 'app/shared/model/numeric.model';

describe('Component Tests', () => {
  describe('Numeric Management Component', () => {
    let comp: NumericComponent;
    let fixture: ComponentFixture<NumericComponent>;
    let service: NumericService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [NumericComponent],
        providers: []
      })
        .overrideTemplate(NumericComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumericComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumericService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Numeric(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.numerics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
