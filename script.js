

//--------------------------------------------------------------------------------------------

let searchButton = document.querySelector("#search");
const inputField = document.querySelector('#input');

searchButton.addEventListener("click", () => {
	sendApiRequest()
})
document.addEventListener("keyup", function (event) {
	if (event.key === 'Enter') {
		sendApiRequest()
	}
});

// EDAMAN API Info	
const appID = 'ba721ae7';
const appKey = '7862ffaf963445f811d887e5890bdca8';
const url = 'https://api.edamam.com/api/search?';

async function sendApiRequest() {

	let param = inputField.value;

	let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${param}&app_id=${appID}&app_key=${appKey}`);
	// console.log(response);
	let data = await response.json();
	let nextPage = data._links.next

	useApiData(data, nextPage);
}

function useApiData(data, nextPage) {
	let myArray = [];

	for (let i = 0; i < data.hits.length; i++) {
		myArray.push(
			`
	<div id="card">
  			<img class="card-img" src="${data.hits[i].recipe.image}" alt="Card image cap">
  	 	<div class="card-body">
    		<h5 class="card-title">${data.hits[i].recipe.label}</h5>
    		<p class="card-text">${data.hits[i].recipe.source}</p>
    		<a href="${data.hits[i].recipe.url}" class="btn btn-primary">See the recipe</a>
  	 	</div>
	</div>

	`);

	}

	let container = document.querySelector("#innerContent");
	container.innerHTML = myArray.join('');

	/**/

}
