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

  static knowledge = {
    base: host + '/knowledge',
    uuid: uuid => host + '/knowledge/' + uuid,
    search: host + '/knowledge/search',
  };

  static complaint = {
    base: host + '/complaint',
    uuid: uuid => host + '/complaint/' + uuid,
    update: uuid => host + '/complaint/' + uuid + '/update',
    assign: uuid => host + '/complaint/' + uuid + '/assign',
    finish: uuid => host + '/complaint/' + uuid + '/finish',
  };

  static sale = {
    base: host + '/sale',
    uuid: uuid => host + '/sale/' + uuid,
    update: uuid => host + '/sale/' + uuid + '/update',
    assign: uuid => host + '/sale/' + uuid + '/assign',
    finish: uuid => host + '/sale/' + uuid + '/finish',
  };

  static label = {
    base: host + '/label',
    uuid: uuid => host + '/label/' + uuid,
  };

  static statistics = {
    base: host + '/statistics',
  };
}
