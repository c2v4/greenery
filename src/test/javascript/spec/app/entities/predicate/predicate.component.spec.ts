/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { PredicateComponent } from 'app/entities/predicate/predicate.component';
import { PredicateService } from 'app/entities/predicate/predicate.service';
import { Predicate } from 'app/shared/model/predicate.model';

describe('Component Tests', () => {
  describe('Predicate Management Component', () => {
    let comp: PredicateComponent;
    let fixture: ComponentFixture<PredicateComponent>;
    let service: PredicateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PredicateComponent],
        providers: []
      })
        .overrideTemplate(PredicateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PredicateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PredicateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Predicate(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.predicates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
