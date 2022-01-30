let counter = 0;
let arry_categoris = [];
categories();

function categories(params) {
  fetch("https://api.chucknorris.io/jokes/categories")
    .then((res) => res.json())
    .then((data) => data.forEach((e) => arry_categoris.push(e)))
    .then(() => arry_function());
}
let title_results = document.getElementById("title-results");
function get_random_joke(e) {
  counter++;
  let joke = document.createElement("div");
  title_results.appendChild(joke);
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then(
      (data) =>
        (joke.innerHTML = `<ins><b id="random">random joke ${counter}</ins> </b><br> <span id="inner_text_joke">${data.value}</span>`)
    );
}
let catagoris_list = document.getElementById("catagoris_list");
catagoris_list.addEventListener("click", all_jokes);
function arry_function(params) {
  arry_categoris.forEach((e) => {
    if (e != "dev" && e != "explicit") {
      let categories = `<li id="${e}" class="list_catagoris">${e}</li>`;
      catagoris_list.innerHTML += categories;
    }
  });
}
let all_jokes_arry = [];
let j;
function all_jokes(e) {
  j = 0;
  for (let i = 0; i < 1000; i++) {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((data) => all_jokes_arry.push(data))
      .then(() => get_random_joke_by_catagory(e, all_jokes_arry));
  }
}

function get_random_joke_by_catagory(e, arry) {
  if (
    arry[arry.length - 1].categories[0] == e.target.innerText &&
    arry[arry.length - 1].value.length > 0 &&
    j < 5
  ) {
    j++;
    counter++;
    let joke = document.createElement("div");
    title_results.appendChild(joke);
    joke.innerHTML += `<ins><b id="bold">Fact/joke of category {${
      e.target.innerText
    }}: ${counter}</ins>. </b><br/> <span id="inner_text_joke">${
      arry[arry.length - 1].value
    }</span>`;
  }
}
let arry_find = [];
function find_result_joke(params) {
  let input = document.getElementById("search").value;
  fetch(`https://api.chucknorris.io/jokes/search?query=${input}`)
    .then((res) => res.json())
    .then((data) => data.result.forEach((e) => arry_find.push(e)))
    .then(() => arry_find_function(arry_find, input));
}
function arry_find_function(arry_find, input) {
  let joke = document.createElement("div");
  title_results.appendChild(joke);
  for (i = 0; i < 5 && i < arry_find.length; i++) {
    counter++,
      (joke.innerHTML += `<br/><ins><b id="search_input">Fact/joke of search ${input} ${counter} </b></ins><br> <span id="inner_text_joke_search">${arry_find[i].value}</span>`);
  }
}
function earase(params) {
  document.getElementById("search").value = "";
}
