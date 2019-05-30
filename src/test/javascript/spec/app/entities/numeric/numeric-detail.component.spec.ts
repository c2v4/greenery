/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { NumericDetailComponent } from 'app/entities/numeric/numeric-detail.component';
import { Numeric } from 'app/shared/model/numeric.model';

describe('Component Tests', () => {
  describe('Numeric Management Detail Component', () => {
    let comp: NumericDetailComponent;
    let fixture: ComponentFixture<NumericDetailComponent>;
    const route = ({ data: of({ numeric: new Numeric(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [NumericDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NumericDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NumericDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.numeric).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
