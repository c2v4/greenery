/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { PredicateDetailComponent } from 'app/entities/predicate/predicate-detail.component';
import { Predicate } from 'app/shared/model/predicate.model';

describe('Component Tests', () => {
  describe('Predicate Management Detail Component', () => {
    let comp: PredicateDetailComponent;
    let fixture: ComponentFixture<PredicateDetailComponent>;
    const route = ({ data: of({ predicate: new Predicate(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PredicateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PredicateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PredicateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.predicate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
