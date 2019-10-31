import { Role } from './role.model';

export interface User {
  uuid?: string;
  name?: string;
  realName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  roles?: Role[];
}
