'use strict';

const button = document.querySelector("button");
button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(document.querySelectorAll('input'));
  fetch(`http://terraform-20190905185139149400000001.cc4trv09ziot.us-east-1.rds.amazonaws.com:3306/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      creatorName: document.querySelectorAll("input")[0].value,
      creatorPassword: document.querySelectorAll("input")[1].value,
      newUsername: document.querySelectorAll("input")[2].value,
      newPassword: document.querySelectorAll("input")[3].value,
    }),
  })
})
