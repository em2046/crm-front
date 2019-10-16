import { Component, OnInit } from '@angular/core';
import { PageData } from '../../../common/class/page-data';
import { KnowledgeService } from '../knowledge.service';
import { TabService } from '../../../framework/tab.service';
import { AlertService } from '../../../common/service/alert.service';
import { finalize } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/common/utils/utils';
import { Knowledge } from '../../../common/dto/knowledge.model';
import { Tab } from '../../../common/class/tab';
import { Page } from '../../../common/class/page';
import { KnowledgeViewComponent } from '../view/knowledge-view.component';

@Component({
  selector: 'app-knowledge-search',
  templateUrl: './knowledge-search.component.html',
  styleUrls: ['./knowledge-search.component.less'],
})
export class KnowledgeSearchComponent implements OnInit, PageData {
  constructor(
    public service: KnowledgeService,
    public tabService: TabService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    this.searchForm = this.formBuilder.group({
      keyword: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(64),
        ],
      ],
    });
  }

  searchForm;
  getLoading = false;
  data: any;

  Utils = Utils;
  list: Knowledge[] = [];

  ngOnInit() {}

  get keyword() {
    return this.searchForm.get('keyword');
  }

  handleSearch(keyword) {
    this.getLoading = true;
    this.service
      .search(keyword)
      .pipe(
        finalize(() => {
          this.getLoading = false;
        }),
      )
      .subscribe(res => {
        this.list = res as Knowledge[];
      });
  }

  onSubmit(data: any) {
    if (!this.searchForm.valid || this.getLoading) {
      return;
    }

    const keyword = data.keyword;
    this.handleSearch(keyword);
  }

  handleView(knowledge: Knowledge) {
    this.tabService.mission(
      new Tab({
        title: '知识查看',
        name: `knowledge-view#${knowledge.uuid}`,
        page: new Page(KnowledgeViewComponent, {
          knowledge,
        }),
      }),
    );
  }
}
