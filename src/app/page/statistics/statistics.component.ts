import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import Statistics from '../../common/model/statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
})
export class StatisticsComponent implements OnInit {
  constructor(public service: StatisticsService) {}

  data: Statistics;
  today = new Date();

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }
}
