'use strict';

const button = document.querySelector("button");
button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(querySelectorAll("input")[0].value)
  fetch(`http://localhost:3001/createuser`, {
    method: 'POST',
    mode: "same-origin",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      creatorname: document.querySelectorAll("input")[0].value,
      creatorpass: document.querySelectorAll("input")[1].value,
      newusername: document.querySelectorAll("input")[2].value,
      newuserpass: document.querySelectorAll("input")[3].value,
    }),
  })
})
