/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'rushman7',
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const cards = document.querySelector('.cards');

for (let i = 0; i < followersArray.length;i++) {
  axios.get(`https://api.github.com/users/${followersArray[i]}`)
  .then(res => {
    console.log(res)
    cards.appendChild(gitCard(res.data))
    // Object.keys(res.data).map(item => cards.appendChild(gitCard(item)))
  })
  .catch(err => {
    console.log("error: ", err)
  })
}

function gitCard(data) {
  let cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  let newImg = document.createElement('img');
  newImg.setAttribute('src', data.avatar_url)
  cardDiv.appendChild(newImg);

  let cardInfoDiv = document.createElement('div');
  cardInfoDiv.classList.add('card-info');
  cardDiv.appendChild(cardInfoDiv);

  let name = document.createElement('h3');
  name.classList.add('name');
  cardInfoDiv.appendChild(name);

  let username = document.createElement('p');
  username.classList.add('username');
  cardInfoDiv.appendChild(username)

  let location = document.createElement('p');
  location.textContent = `Location: ${data.location}`
  cardInfoDiv.appendChild(location)

  let profile = document.createElement('p');
  let htmlUrl = document.createElement('a');
  htmlUrl.setAttribute('href', data.html_url)
  profile.textContent = `Profile: `
  htmlUrl.textContent = `${data.html_url}`
  cardInfoDiv.appendChild(profile)
  profile.appendChild(htmlUrl);

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${followersArray.length}`
  cardInfoDiv.appendChild(followers)

  let following = document.createElement('p');
  following.textContent = `Following: ${data.following}`
  cardInfoDiv.appendChild(following)

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${data.bio}`
  cardInfoDiv.appendChild(bio)

  console.log(cardDiv)
  return cardDiv;
}
