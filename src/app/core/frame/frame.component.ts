import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Utils from '../../../utils/utils';
import { TabService } from '../../common/tab.service';
import { User } from '../../dto/user.model';
import { UserService } from '../../common/user.service';
import { Tab } from '../tab';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.less'],
})
export class FrameComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  selected = new FormControl(0);
  user: User;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  constructor(
    private readonly router: Router,
    public tabService: TabService,
    private readonly userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    Utils.updateAuth();
    tabService.mission$.subscribe(msg => {
      this.handleOpen(msg);
    });
  }

  ngOnInit() {
    if (!Utils.accessToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.getUserInfo();
  }

  handleOpen(newTab) {
    const foundIndex = this.tabs.findIndex(tab => {
      return tab.name === newTab.name;
    });
    if (foundIndex !== -1) {
      this.selected.setValue(foundIndex);
      return;
    }
    this.tabs.push(newTab);
    this.selected.setValue(this.tabs.length - 1);
  }

  handleClose(i: number) {
    this.tabs.splice(i, 1);
  }

  private getUserInfo() {
    this.userService.getUserByToken().subscribe(res => {
      this.user = res;
      sessionStorage.setItem('user', JSON.stringify(res));
    });
  }
}
