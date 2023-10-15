import createRequest from '../../api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class NewsService {
  constructor(url) {
    this.url = url;
  }

  list(callback) {
    createRequest({
      url: this.url,
      sendMethod: 'GET',
      method: 'news',
      callback,
    });
  }
}
