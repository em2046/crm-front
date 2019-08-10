import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.less'],
})
export class FrameComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      this.router.navigate(['/login']);
    }
  }
}
