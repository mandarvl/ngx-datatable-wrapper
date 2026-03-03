import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription, skip, distinctUntilChanged, debounceTime } from 'rxjs';

@Directive({
  selector: '[ngModelChangeDebounced]'
})
export class ModelDebouncedDirective implements OnDestroy {
  @Output()
  ngModelChangeDebounced = new EventEmitter<any>();
  @Input()
  ngModelChangeDebounceTime = 1000; // optional

  subscription: Subscription;
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(private ngModel: NgModel) {
    this.subscription = this.ngModel.control.valueChanges.pipe(
      // skip(1), // skip initial value
      distinctUntilChanged(),
      debounceTime(this.ngModelChangeDebounceTime)
    ).subscribe((value) => this.ngModelChangeDebounced.emit(value));
  }
}
