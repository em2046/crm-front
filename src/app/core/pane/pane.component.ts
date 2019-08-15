import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { PaneDirective } from './pane.directive';

@Component({
  selector: 'app-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.less'],
})
export class PaneComponent implements OnInit {
  @Input()
  tab;

  @ViewChild(PaneDirective, { static: true }) appPanePage: PaneDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const page = this.tab.page;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      page.component,
    );
    const componentRef = this.appPanePage.viewContainerRef.createComponent(
      componentFactory,
    );
    (componentRef.instance as PageComponent).data = page.data;
  }
}
