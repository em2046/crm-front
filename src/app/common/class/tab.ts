import { Page } from '../../page/page';

interface TabOptions {
  title: string;
  icon?: string;
  name: string;
  page: Page;
}

export class Tab {
  constructor(options: TabOptions) {
    Object.assign(this, options);
  }

  title: string;
  icon?: string;
  name: string;
  page: Page;
}
