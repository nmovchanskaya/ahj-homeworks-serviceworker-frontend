import NewsService from './newsService';
import imgUrl from '../../img/fabelmans.jpg';

export default class NewsWidget {
  constructor(container) {
    this.container = container;
    if (process.env.NODE_ENV === 'development') {
      this.url = 'http://localhost:7070/';
    } else {
      this.url = 'https://ahj-homeworks-serviceworker-backend.onrender.com/';
    }
    this.NewsService = new NewsService(this.url);
  }

  bindToDOM() {
    this.containerElem = document.querySelector(this.container);
  }

  getFakeData() {
    return {
      news: [
        {
          title: 'Waiting for news',
          photo: imgUrl,
          date: Date.now(),
        },
        {
          title: 'Waiting for news',
          photo: imgUrl,
          date: Date.now(),
        },
      ],
    };
  }

  getNews() {
    // if we have cache - render from cache
    caches.match(`${this.url}news`)
      .then(async (response) => {
        if (response !== undefined) {
          return response.json();
        } else {
          // else show fake news
          return this.getFakeData();
        }
      })
      .then((data) => {
        this.renderNews(data.news, true);
      });

    // send request to the server
    // plus save new data in cache
    this.NewsService.list((data) => {
      this.clearNews();
      this.renderNews(data.news);
    });
  }

  clearNews() {
    const newsElems = document.querySelectorAll('.news-item');
    newsElems.forEach((item) => {
      item.remove();
    });
  }

  renderNewsItem(item, blured) {
    const newsElem = document.createElement('div');
    const date = new Date(item.date);
    const img = item.photo;
    let itemClass;

    if (blured) {
      itemClass = 'news-item blured';
    } else {
      itemClass = 'news-item';
    }

    newsElem.innerHTML = `
        <div class="${itemClass}">
            <div class="news__date">
              ${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}
            </div>
            <div class="news__content">
                <img src="${img}" class="news__content_img">
                <div class="new__content_title">
                  ${item.title}
                </div>
            </div>
        </div>
    `;

    return newsElem;
  }

  renderNews(news, blured) {
    news.forEach((item) => {
      const elem = this.renderNewsItem(item, blured);
      this.containerElem.insertBefore(elem, null);
    });
  }
}
