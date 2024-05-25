import { getValueFromStore } from "./core.js";
import { FILTER_RECIPE_COUNTRIES } from "./constants.js";

function createOptionHTML(values) {
  return values
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");
}

export function renderFilter() {
  const countries = FILTER_RECIPE_COUNTRIES;

  const filterHTML = `
		<div class="filter-item">
            <label for="country">Filter by</label>
            <select id="filter-country" name="country">
                <option value="">All</option>
                ${createOptionHTML(countries)}
            </select>
        </div>

        <div class="filter-item">
            <label for="sortBy">Sort by</label>
            <select id="sortBy" name="sortBy">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>

        <div class="filter-item">
            <label for="search-keyword">Search</label>
            <input name="search-keyword" id="search-keyword" class="" placeholder="something..."></input>
        </div>
  `;

  const filterSelector = document.querySelector(".recipe-filter");
  if (filterSelector) {
    filterSelector.innerHTML = filterHTML;
  }
}
