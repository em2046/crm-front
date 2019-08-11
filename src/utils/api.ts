const host = '//localhost:3000';

export default class Api {
  static user = {
    findAll: host + '/user',
    create: host + '/user',
    login: host + '/auth/login',
  };

  static role = {
    findAll: host + '/role',
  };

  static permission = {
    findAll: host + '/permission',
  };
}
