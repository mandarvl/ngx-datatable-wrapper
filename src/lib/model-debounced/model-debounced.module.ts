import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDebouncedDirective } from './model-debounced.directive';



@NgModule({
  declarations: [
    ModelDebouncedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModelDebouncedDirective
  ]
})
export class ModelDebouncedModule { }
