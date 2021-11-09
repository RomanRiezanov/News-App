const menuBtn = document.getElementById('menu-btn');
const categories = document.getElementById('categories');
const trending = document.getElementById('trending');
const scroll = document.getElementById('scroll_to_top');
const sport = document.getElementById('sport_news');
const world = document.getElementById('world_news');
const covid = document.getElementById('covid_news');
const business = document.getElementById('business_news');
const politics = document.getElementById('politics_news');
const science = document.getElementById('science_news');
const religion = document.getElementById('religion_news');
const health = document.getElementById('health_news');
let urlApi = sessionStorage.getItem("autosave") ?
 sessionStorage.getItem("autosave") :
 "https://content.guardianapis.com/search?q=trending&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c";
const newsSection = document.getElementById('main_news');
const today = new Date();
const length = 500;


const reloadPage = categories => {
    sessionStorage.setItem("reloading", "true");
    sessionStorage.setItem("autosave", `https://content.guardianapis.com/search?q=${categories}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`)
    document.location.reload();
}


window.onscroll = function() {scrollFunction()};

const scrollFunction =  () => {
    scroll.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "grid" : "none";
}

const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

let menuOpen = false;

menuBtn.addEventListener('click', () => {
    !menuOpen ? menuBtn.classList.add('open') : menuBtn.classList.remove('open');
    categories.style.visibility = !menuOpen ? "visible" : "hidden";
    trending.style.visibility = !menuOpen ? "visible" : "hidden";
    menuOpen = !menuOpen ? true : false;  
})


fetch(urlApi)
    .then(response => response.json())
    .then(response => {
        console.log(response);
       let arrNews = response.response.results;
       let lastNews = arrNews[0];

       arrNews.forEach(news => {
            console.log(news);
            
            if (new Date(news.webPublicationDate) > new Date(lastNews.webPublicationDate)) {
                lastNews = news;
            }

            let article = document.createElement('article');
            let img = document.createElement('img');
            let newsTitle = document.createElement('h4');
            let text = document.createElement('p');
            let div = document.createElement('div');
            let data = document.createElement('data');
            let link = document.createElement('a');
            let date = new Date(news.webPublicationDate);
            console.log(news.webPublicationDate);
            
            console.log(date);

            let resultsDay = (today - date) / (60 * 60 * 24 * 1000); 


            article.className = "main-article-news";
            newsTitle.className = "article-news-name";
            text.className = "article-news-text";
            div.className = "article_news-block-data";
            data.className = "main_news-block-data_time-text";
            link.className = "main_news-block-data_time-read";
            

            img.src = news.fields.thumbnail;
            newsTitle.innerHTML = news.webTitle;
            text.innerHTML = news.fields.bodyText;
            data.innerHTML = Math.floor(resultsDay) === 0 ?
                "today" :
                 Math.floor(resultsDay) + " days ago";
            link.innerHTML = "Read more";
            link.href = news.webUrl;
            link.target = "_blank";

            let newsText = text.innerHTML;
            let trimmedString = newsText.length > length ?
            newsText.substring(0, length) + "..." :
            newsText;
          
            text.innerHTML = trimmedString;

            newsSection.appendChild(article);
            article.appendChild(img);
            article.appendChild(newsTitle);
            article.appendChild(text);
            article.appendChild(div);
            div.appendChild(data);
            div.appendChild(link);
       })

       let lastNewsDate = new Date(lastNews.webPublicationDate);
       let lastNewsDateResults = (today - lastNewsDate) / (60 * 60 * 24 * 1000);

       let lastNewsText = lastNews.fields.bodyText;
       let lastTrimmedNews = lastNewsText.length > length ?
            lastNewsText.substring(0, length) + "..." :
            lastNewsText;

       document.getElementById('main_news-block-name').innerHTML = lastNews.webTitle;
       document.getElementById('main_news-block-text').innerHTML = lastTrimmedNews;
       document.getElementById('main_news-block-data_time-text').innerHTML = Math.floor(lastNewsDateResults) === 0 ?
        "today" :
         Math.floor(lastNewsDateResults) + " days ago";; 
       document.getElementById('main_news-block-data_time-read').innerHTML = "Read more";
       document.getElementById('news-block-image').src = lastNews.fields.thumbnail;
    });

