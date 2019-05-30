/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { RuleComponent } from 'app/entities/rule/rule.component';
import { RuleService } from 'app/entities/rule/rule.service';
import { Rule } from 'app/shared/model/rule.model';

describe('Component Tests', () => {
  describe('Rule Management Component', () => {
    let comp: RuleComponent;
    let fixture: ComponentFixture<RuleComponent>;
    let service: RuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [RuleComponent],
        providers: []
      })
        .overrideTemplate(RuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rule(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
