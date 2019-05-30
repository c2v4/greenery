/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { PropertyDetailComponent } from 'app/entities/property/property-detail.component';
import { Property } from 'app/shared/model/property.model';

describe('Component Tests', () => {
  describe('Property Management Detail Component', () => {
    let comp: PropertyDetailComponent;
    let fixture: ComponentFixture<PropertyDetailComponent>;
    const route = ({ data: of({ property: new Property(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PropertyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PropertyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.property).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
