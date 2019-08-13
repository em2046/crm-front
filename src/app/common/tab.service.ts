import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private missionSource = new Subject();

  mission$ = this.missionSource.asObservable();

  mission(msg) {
    this.missionSource.next(msg);
  }

  constructor() {}
}
