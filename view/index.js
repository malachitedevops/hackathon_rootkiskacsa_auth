'use strict';

const button = document.querySelector("button");
button.addEventListener('click', (event) => {
  event.preventDefault();
  fetch(`http://ec2-54-81-110-184.compute-1.amazonaws.com/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "creatorname": document.querySelectorAll("input")[0].value,
      "creatorpass": document.querySelectorAll("input")[1].value,
      "newusername": document.querySelectorAll("input")[2].value,
      "newuserpass": document.querySelectorAll("input")[3].value,
    },
  })
})
