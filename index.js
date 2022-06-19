

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=174f7082-a54c-4bd1-8501-2bd86fe0de79';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=3&api_key=174f7082-a54c-4bd1-8501-2bd86fe0de79';

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
      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;
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
    } 
    
  } catch (error){
    console.log('error');
  }
}

async function saveFavoritesMyDog() {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: 'gJA_mt09Q',
    }),
  });

  const data = await res.json();
  console.log('save');
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = 'There was an error' + res.status + data.message;
  } 
}


loadRandomMyDog();
loadFavoritesMyDog();


const myButton = document.querySelector('button');
myButton.onclick = loadRandomMyDog;