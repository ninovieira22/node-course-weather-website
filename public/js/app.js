console.log("Client side javascript file is loaded!");

// fetch("https://swapi.dev/api/people/1").then((response) => {
//   response.json().then((data) => {
//     console.log(data.name);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(
    "/weather?address=" +
      location
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
