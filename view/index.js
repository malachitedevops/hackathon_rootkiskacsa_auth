'use strict';

const button = document.querySelector("button");
button.addEventListener('click', (event) => {
  event.preventDefault();
  fetch("http://54.81.110.184:3001/createuser", {
    method: 'POST',
    mode: "same-origin",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "creatorname": document.querySelectorAll("input")[0].value,
      "creatorpass": document.querySelectorAll("input")[1].value,
      "newusername": document.querySelectorAll("input")[2].value,
      "newuserpass": document.querySelectorAll("input")[3].value,
    }),
  })
})
