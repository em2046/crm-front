import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../knowledge.service';
import { AlertService } from '../../../common/service/alert.service';
import { Knowledge } from '../../../common/dto/knowledge.model';

@Component({
  selector: 'app-knowledge-view',
  templateUrl: './knowledge-view.component.html',
  styleUrls: ['./knowledge-view.component.less'],
})
export class KnowledgeViewComponent implements OnInit {
  constructor(
    public service: KnowledgeService,
    public alertService: AlertService,
  ) {}

  data: {
    knowledge: Knowledge;
  };
  knowledge: Knowledge = { title: '' };

  ngOnInit() {
    this.getKnowledge(this.data.knowledge.uuid);
  }

  getKnowledge(uuid) {
    this.service.getKnowledge(uuid).subscribe(res => {
      this.knowledge = res;
    });
  }
}
