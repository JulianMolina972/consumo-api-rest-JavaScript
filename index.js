const api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = '174f7082-a54c-4bd1-8501-2bd86fe0de79';

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
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
    const res = await fetch(API_URL_FAVORITES, {
      method: 'GET',
      headers: {
        'X-API-KEY': '174f7082-a54c-4bd1-8501-2bd86fe0de79',
      },
      
    });
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
  //axios
  const {data, status} = await api.post('/favourites', {
    image_id: id,
  });

  //fetch
  // const res = await fetch(API_URL_FAVORITES, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-API-KEY': '174f7082-a54c-4bd1-8501-2bd86fe0de79',
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });

  // const data = await res.json();
  console.log('save');
  

  if (status !== 200) {
    spanError.innerHTML = 'There was an error' + status + data.message;
  } else {
    console.log('Dog saved in favorites');
    loadFavoritesMyDog();
  }
}

async function deleteFavoritesMyDog(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': '174f7082-a54c-4bd1-8501-2bd86fe0de79',
    }
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

async function uploadDogPhoto(){
  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-type': 'multipart/form-data',
      'X-API-KEY': '174f7082-a54c-4bd1-8501-2bd86fe0de79',
    },
    body: formData,
  })
  const data = await res.json();
  

  if (res.status !== 201) {
    spanError.innerHTML = 'There was an error' + res.status + data.message;
  } else {
    console.log('Dog photo uploaded');
    console.log({data});
    console.log(data.url);
    saveFavoriteMyDog(data.id);
    
  }
}

const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
}


loadRandomMyDog();
loadFavoritesMyDog();


