import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableWrapperComponent } from './datatable-wrapper.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule, INgxDatatableConfig } from '@swimlane/ngx-datatable';
import { ModelDebouncedModule } from './model-debounced/model-debounced.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { DATATABLE_WRAPPER_CONFIG, DatatableWrapperConfig } from './types/datatable-wrapper-config.interface';


@NgModule({
  declarations: [
    DatatableWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ModelDebouncedModule,
    TranslateModule,
    NgSelectModule,
    BsDatepickerModule,
    NgxDatatableModule
  ],
  exports: [
    DatatableWrapperComponent,
    NgxDatatableModule
  ]
})
export class DatatableWrapperModule {
  static forRoot(
    ngxDatatableConfig?: INgxDatatableConfig,
    wrapperConfig?: DatatableWrapperConfig
  ): ModuleWithProviders<DatatableWrapperModule> {
    const providers: any[] = [];

    if (ngxDatatableConfig) {
      providers.push(...NgxDatatableModule.forRoot(ngxDatatableConfig).providers || []);
    }

    if (wrapperConfig) {
      providers.push({
        provide: DATATABLE_WRAPPER_CONFIG,
        useValue: wrapperConfig
      });
    }

    return {
      ngModule: DatatableWrapperModule,
      providers: providers
    };
  }
}
