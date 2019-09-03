import { environment } from '../../../environments/environment';

const host = environment.apiUrl;

export default class Api {
  static auth = {
    login: host + '/auth/login',
    me: host + '/auth/me',
  };

  static user = {
    base: host + '/user',
    uuid: uuid => host + '/user/' + uuid,
  };

  static role = {
    base: host + '/role',
    joinPermissions: host + '/role?join=permissions',
    uuid: uuid => host + '/role/' + uuid,
    uuidJoinPermissions: uuid => host + '/role/' + uuid + '?join=permissions',
  };

  static permission = {
    base: host + '/permission',
  };

  static customer = {
    base: host + '/customer',
    uuid: uuid => host + '/customer/' + uuid,
  };
}
