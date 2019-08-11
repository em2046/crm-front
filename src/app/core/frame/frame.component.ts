import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Tab } from '../tab';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.less'],
})
export class FrameComponent implements OnInit {
  tabs: Tab[] = [];
  selected = new FormControl(0);

  constructor(private readonly router: Router) {}

  ngOnInit() {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      this.router.navigate(['/login']);
    }
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
}
