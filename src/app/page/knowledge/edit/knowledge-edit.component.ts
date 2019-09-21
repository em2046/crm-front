import { Component, OnInit } from '@angular/core';
import { PageEdit } from '../../common/page-edit';
import { Knowledge } from '../../../common/dto/knowledge.model';
import { KnowledgeService } from '../knowledge.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-knowledge-edit',
  templateUrl: './knowledge-edit.component.html',
  styleUrls: ['../../common/edit.less', './knowledge-edit.component.less'],
})
export class KnowledgeEditComponent extends PageEdit<Knowledge>
  implements OnInit {
  constructor(
    public service: KnowledgeService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    super();
    this.editForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(64),
        ],
      ],
      content: [''],
      author: [''],
    });
  }

  get title() {
    return this.editForm.get('title');
  }

  get content() {
    return this.editForm.get('content');
  }

  get author() {
    return this.editForm.get('author');
  }

  private knowledgeDefaultValue: Knowledge = {
    title: '',
    content: '',
  };

  public Editor = ClassicEditor;
  public config = {
    placeholder: '请输入文章内容...',
    language: 'zh-cn',
  };

  data: {
    type: string;
    knowledge: Knowledge;
  };
  knowledge: Knowledge = { title: '' };

  public model = {
    editorData: '<p>Hello, world!</p>',
  };

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';
    if (this.isEdit) {
      this.getKnowledge(this.data.knowledge.uuid);
    }
  }

  getKnowledge(uuid) {
    this.service.getKnowledge(uuid).subscribe(res => {
      this.knowledgeDefaultValue = res;
      this.knowledge = res;
      this.setKnowledge(res);
    });
  }

  setKnowledge(data) {
    this.title.setValue(data.title);
    this.content.setValue(data.content);
    this.author.setValue(data.author);
  }

  onSubmit(data: Knowledge) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }

    const knowledge = this.data.knowledge;
    const json: Knowledge = {
      title: data.title,
      content: data.content,
      author: data.author,
    };

    this.saveLoading = true;
    if (this.isEdit) {
      this.saveEdit(knowledge, json);
    } else {
      this.saveNew(json);
    }
  }

  resetEdit() {}

  resetNew() {}
}
