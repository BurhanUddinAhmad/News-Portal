const loadCategory = async() => {
    const resp  = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const allNews = await resp.json();

   const categoryContainer = document.getElementById('category-container');
    allNews.data.news_category.forEach((news)=>{
        // console.log(news.category_name);
        const div = document.createElement('div');
        div.innerHTML = `<button onclick="loadNews('${news.category_id}')" class="btn">${news.category_name}</button>`;
        
        categoryContainer.appendChild(div);
    });
    
    // console.log(allNews.data.news_category);
}

const loadNews = async(categoryId="08") => {
    const resp = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const newsData = await resp.json();
    
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsData.data.forEach((news)=>{
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-side bg-base-100">
        <figure><img class="w-80 h-full" src="${news.image_url}" alt="Movie"/></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title}</h2>
          <p class="text-gray-500">${news.details.slice(0, 200)}</p>
          <div class="card-actions justify-between items-center">
            <div>
                <p>Views: <span>${news.total_view}</span></p>
            </div>
            <button class="btn btn-primary">Details</button>
          </div>
        </div>
      </div>
        
        `;

        newsContainer.appendChild(div);
    });

    // console.log(newsData.data);
}

loadNews();
loadCategory();