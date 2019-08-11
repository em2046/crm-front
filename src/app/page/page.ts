import { Type } from '@angular/core';

export class Page {
  constructor(public component: Type<any>, public data: any) {}
}
