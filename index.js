

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?api_key=174f7082-a54c-4bd1-8501-2bd86fe0de79';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=174f7082-a54c-4bd1-8501-2bd86fe0de79`;

const spanError = document.getElementById('error');




// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;  
//   });

async function loadRandomMyDog() {
  try{
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data);
    
    if (res.status !== 200) {
      spanError.innerHTML = 'There was an error' + res.status;
    } else {

      const img1 = document.getElementById('img1');
      const img2 = document.getElementById('img2');
      const img3 = document.getElementById('img3');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');
      const btn3 = document.getElementById('btn3');

      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;

      btn1.onclick = () => saveFavoriteMyDog(data[0].id);
      btn2.onclick = () => saveFavoriteMyDog(data[1].id);
      btn3.onclick = () => saveFavoriteMyDog(data[2].id);

    }

    

  } catch (error){
    console.log('error');
  }
}

async function loadFavoritesMyDog() {
  try{
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favorites')
    console.log(data);

    if (res.status !== 200) {
      spanError.innerHTML = 'There was an error' + res.status + data.message;
    } else {
      const section = document.getElementById('favoritesDogs');
      section.innerHTML = "";
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Favorites Dogs');
      h2.appendChild(h2Text);
      section.appendChild(h2);
      data.forEach(dog => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('take out dog in favorites');

        img.src = dog.image.url;
        img.width = 250;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavoritesMyDog(dog.id);

        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);

        
      });
    }
    
  } catch (error){
    console.log('error');
  }
}

async function saveFavoriteMyDog(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();
  console.log('save');
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = 'There was an error' + res.status + data.message;
  } else {
    console.log('Dog saved in favorites');
    loadFavoritesMyDog();
  }
}

async function deleteFavoritesMyDog(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
  });

  const data = await res.json();
  console.log('Delete');
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = 'There was an error' + res.status + data.message;
  } else {
    console.log('Dog removed from favorites');
    loadFavoritesMyDog();
  }
}


loadRandomMyDog();
loadFavoritesMyDog();


