const host = '//localhost:3000';

export default class Api {
  static user = {
    create: host + '/user',
    login: host + '/user/login',
  };
}
