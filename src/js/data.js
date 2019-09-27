import axios from "axios";

async function getData() {
  let data = await axios.get("https://chobdy-api.herokuapp.com/cfbc/");
  console.log(data);
}

//const btn = document.querySelector("get-data");

//btn.addEventListener("click", getData);
getData();
