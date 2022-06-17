

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=174f7082-a54c-4bd1-8501-2bd86fe0de79';




// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;  
//   });

async function myDog() {
  try{
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log(data);
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  } catch (error){
    console.log('error');
  }
}

myDog();

const myButton = document.querySelector('button');
myButton.onclick = myDog;