

//--------------------------------------------------------------------------------------------

let searchButton = document.querySelector("#search");
const inputField = document.querySelector('#input');

searchButton.addEventListener("click", () => {
	console.log("button pressed");
	sendApiRequest()
})
// EDAMAN API Info	

async function sendApiRequest() {
	let appID = 'c8bc3025';
	let appKey = 'e5617258b5c6b8ba5d7371baaf7255a8';
	let url = 'https://api.edamam.com/search?';
	let queryParams = "q=";
	let ingredient = inputField.value;

	let response = await fetch(`${url}app_id=${appID}&app_key=${appKey}&${queryParams}${ingredient}`);
	console.log(response);
	let data = await response.json();
	console.log(data);

	useApiData(data);
}

function useApiData(data) {
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

	document.querySelector("#innerContent").innerHTML = myArray.join('');
}
