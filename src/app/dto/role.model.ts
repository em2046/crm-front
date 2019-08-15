import { Permission } from './permission.model';

export class Role {
  uuid?: string;
  name?: string;
  title?: string;
  permissions?: Permission[];
}
