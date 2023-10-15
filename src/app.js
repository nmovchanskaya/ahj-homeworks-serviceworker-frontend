import NewsWidget from './components/news/newsWidget';
// import swURL from "file-loader?name=sw.js!babel-loader!./sw";
import './sw';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: './' })
    .then((reg) => {
        // регистрация сработала
        console.log(`Registration succeeded. Scope is ${reg.scope}`);
        // console.log(swURL);
    }).catch((error) => {
        // регистрация прошла неудачно
        console.log(`Registration failed with ${error}`);
    });
}

const newsWidget = new NewsWidget('.container');
newsWidget.bindToDOM();
newsWidget.renderContent();
newsWidget.getNews();
