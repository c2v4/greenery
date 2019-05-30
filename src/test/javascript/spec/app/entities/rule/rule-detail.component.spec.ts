/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { RuleDetailComponent } from 'app/entities/rule/rule-detail.component';
import { Rule } from 'app/shared/model/rule.model';

describe('Component Tests', () => {
  describe('Rule Management Detail Component', () => {
    let comp: RuleDetailComponent;
    let fixture: ComponentFixture<RuleDetailComponent>;
    const route = ({ data: of({ rule: new Rule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [RuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
