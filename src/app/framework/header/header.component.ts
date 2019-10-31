import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../common/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSidebar = new EventEmitter();

  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}

  handleToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
