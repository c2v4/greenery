import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entry',
        loadChildren: './entry/entry.module#GreeneryEntryModule'
      },
      {
        path: 'label',
        loadChildren: './label/label.module#GreeneryLabelModule'
      },
      {
        path: 'scheduler-config',
        loadChildren: './scheduler-config/scheduler-config.module#GreenerySchedulerConfigModule'
      },
      {
        path: 'property',
        loadChildren: './property/property.module#GreeneryPropertyModule'
      },
      {
        path: 'rule',
        loadChildren: './rule/rule.module#GreeneryRuleModule'
      },
      {
        path: 'predicate',
        loadChildren: './predicate/predicate.module#GreeneryPredicateModule'
      },
      {
        path: 'expression',
        loadChildren: './expression/expression.module#GreeneryExpressionModule'
      },
      {
        path: 'numeric',
        loadChildren: './numeric/numeric.module#GreeneryNumericModule'
      },
      {
        path: 'executor-config',
        loadChildren: './executor-config/executor-config.module#GreeneryExecutorConfigModule'
      },
      {
        path: 'executor-label',
        loadChildren: './executor-label/executor-label.module#GreeneryExecutorLabelModule'
      },
      {
        path: 'scheduler-config',
        loadChildren: './scheduler-config/scheduler-config.module#GreenerySchedulerConfigModule'
      },
      {
        path: 'scheduler-type',
        loadChildren: './scheduler-type/scheduler-type.module#GreenerySchedulerTypeModule'
      },
      {
        path: 'executor-config',
        loadChildren: './executor-config/executor-config.module#GreeneryExecutorConfigModule'
      },
      {
        path: 'executor-type',
        loadChildren: './executor-type/executor-type.module#GreeneryExecutorTypeModule'
      },
      {
        path: 'scheduler-config',
        loadChildren: './scheduler-config/scheduler-config.module#GreenerySchedulerConfigModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryEntityModule {}
