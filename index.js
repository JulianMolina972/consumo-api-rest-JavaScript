

const URL = 'https://api.thedogapi.com/v1/images/search';




// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;  
//   });

async function myDog() {
  try{
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
  } catch (error){
    console.log('error');
  }
}

const myButton = document.querySelector('button');
myButton.onclick = myDog;