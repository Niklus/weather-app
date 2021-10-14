const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = input.value;

  messageOne.textContent = "Lodaing...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + address)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
});
