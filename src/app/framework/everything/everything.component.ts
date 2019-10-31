import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Utils from '../../common/utils/utils';
import { TabService } from '../tab.service';
import { User } from '../../common/model/user.model';
import { UserService } from '../../common/service/user.service';
import { Tab } from '../../common/class/tab';

@Component({
  selector: 'app-frame',
  templateUrl: './everything.component.html',
  styleUrls: ['./everything.component.less'],
})
export class EverythingComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  selected = new FormControl(0);
  user: User;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  ngOnDestroy(): void {
    // TODO 等Safari支持后使用新API
    // this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
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

    // TODO 等Safari支持后使用新API
    // this.mobileQuery.addEventListener('change', this.mobileQueryListener);
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
    this.userService.getByToken().subscribe(res => {
      this.user = res;
      sessionStorage.setItem('user', JSON.stringify(res));
    });
  }
}
