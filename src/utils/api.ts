import { environment } from '../environments/environment';

const host = environment.apiUrl;

export default class Api {
  static auth = {
    login: host + '/auth/login',
  };

  static user = {
    base: host + '/user',
    uuid: uuid => host + '/user/' + uuid,
  };

  static role = {
    base: host + '/role',
  };

  static permission = {
    base: host + '/permission',
  };
}
