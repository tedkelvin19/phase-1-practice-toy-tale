let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyCollection = document.getElementById('toy-collection')
  // fetch request function
  function getAllToys(){
    fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy=>renderAllToys(toy)))
}
getAllToys()
  
  //render images function
  function renderAllToys(toy){
    let card = document.createElement('div')
    card.className= 'card'
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" >
      <p>${toy.likes}</p>
      <button class="like-btn" id="[toy_id]">Like ❤️</button>
    `
    // add toy to the DOM
    toyCollection.appendChild(card)
    // add aclick event to like button
    card.querySelector('.like-btn').addEventListener('click', ()=>{
      toy.likes += 1
      card.querySelector('p').textContent = toy.likes
      /// create a patch request
      updateLikes(toy)
    })
  }

  // a function to update like on server using patch
  function updateLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
         accept:'application/json'
      },
      body: JSON.stringify(toyObj)
    })
  }

  /// add a new toy
  document.querySelector('.add-toy-form'),addEventListener('submit', createToy)
  // callback function to create a toy
  function createToy(e){
    e.preventDefault()
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    renderAllToys(toyObj)
    handletoypost(toyObj)   
  }
  /// function to post the toy
  function handletoypost(toyObj){
    fetch('http://localhost:3000/toys',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
