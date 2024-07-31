const search_btn = document.querySelector(".search");
const clear_btn = document.querySelector(".clear");
const input = document.querySelector("input");
const results_container = document.querySelector(".results-container");

let travelData;
function generateHTML(obj) {
  return `
        <div class="result">
            <img src=${obj.imageUrl} alt="" />
            <h2>${obj.name}</h2>
            <p>
              ${obj.description}
            </p>
          </div>
    `;
}
function getData() {
  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      travelData = data;
    });
}
getData();
search_btn.addEventListener("click", () => {
  results_container.innerHTML = "";
  let validKeywords = ["beach", "temple", "country", "countries"];
  let dataKeys = [];
  validKeywords.forEach((word) => {
    if (input.value.toLowerCase().includes(word)) {
      if (word === "beach") dataKeys.push("beaches");
      if (word === "temple") dataKeys.push("temples");
      if (word === "country" || word === "countries")
        dataKeys.push("countries");
    }
  });
  results_container.classList.remove("hidden");
  if (dataKeys.length) alert("Scroll to view all results");
  dataKeys.forEach((search) => {
    travelData[search].forEach((el) => {
      if (!el["cities"])
        results_container.insertAdjacentHTML("beforeend", generateHTML(el));
      else
        el["cities"].forEach((city) => {
          console.log(city);
          results_container.insertAdjacentHTML("beforeend", generateHTML(city));
        });
    });
  });
  input.value = "";
});

clear_btn.addEventListener("click", () => {
  results_container.classList.add("hidden");
  results_container.innerHTML = "";
});
