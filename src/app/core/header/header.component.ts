import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../dto/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}
}
