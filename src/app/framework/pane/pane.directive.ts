import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPanePage]',
})
export class PaneDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
