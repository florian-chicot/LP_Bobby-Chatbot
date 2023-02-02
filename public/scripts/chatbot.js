async function getCountry(countryName) {
  const url = "https://restcountries.com/v3.1/name/" + countryName;
  let response = await fetch(url);
  return await response.json();
}

function addUserMessage() {
  let chat = document.querySelector('#wrapperChat');
  let textarea = document.querySelector('#textarea');

  let p = document.createElement('p');
  let pText = document.createTextNode(textarea.value);
  p.appendChild(pText);

  p.classList.add('blockChatUser', 'blockChat')

  chat.appendChild(p);
	chat.scrollTop = chat.scrollHeight;
  textarea.style.height = '24px';
}

handleMessage = require('./handleMessage');

async function addBobbyMessage() {
  let chat = document.querySelector('#wrapperChat');
  let messageUser = document.querySelector('#textarea');
  let res;
  res = await handleMessage(messageUser.value);

  if (res.startsWith('https://flagcdn.com', 0)) {
    console.log(res)
    countryCode = res.charAt(res.length-6) + res.charAt(res.length-5);
    country = await getCountry(countryCode);
    let flagImg = document.createElement('img');
    flagImg.src = res;
    flagImg.width = 200;
    document.querySelector('#wrapperChat').appendChild(flagImg)
    res = "This is " + country[0]["name"]["common"] + "'s flag";
  }
  let p = document.createElement('p');
  let pText = document.createTextNode(res);
  p.appendChild(pText);

  p.classList.add('blockChatBobby', 'blockChat')

  chat.appendChild(p);
	chat.scrollTop = chat.scrollHeight;

  messageUser.value = "";
}

function chatMessage() {
  addUserMessage();
  addBobbyMessage();
}

let textarea = document.getElementById("textarea");

textarea.addEventListener("keydown", (event) => {
	const keyname = event.key;
	if (keyname === 'Enter' && !event.shiftKey) {
		event.preventDefault();
		chatMessage();
	}
})

textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

let themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function () {
  let wrapperBody = document.getElementById("wrapperBody");
  let sun = document.getElementById("sun");
  let moon = document.getElementById("moon");

  wrapperBody.classList.toggle('dark-theme');
  wrapperBody.classList.toggle('light-theme');

  if (wrapperBody.classList.contains('dark-theme')) {
    moon.classList.add('display-none');
    sun.classList.remove('display-none');
  } else if (wrapperBody.classList.contains('light-theme')) {
    sun.classList.add('display-none');
    moon.classList.remove('display-none');
  }
});