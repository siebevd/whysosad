import CONFIG from "../../config";

/**
 * Get a random gif
 * @return {Promise}
 */
function getRandomGif() {
	return fetch(
		`https://api.giphy.com/v1/gifs/random?api_key=${
			CONFIG.giphy.apiKey
		}&tag=&rating=G`
	)
		.then(res => res.json())
		.then(data => {
			// Return the url of the image
			return Promise.resolve(data.data.image_url);
		})
		.catch(e => console.log("ERROR:", e));
}

/**
 * Get an array of images based on a search term
 * @param  {String} search - the string we need to search for
 * @param  {Boolean} randomResult - should we just return a randomized array
 * @return {Promise}
 */
function searchGifs(search, randomResult) {
	let randomized = "";

	if (randomResult) {
		// Let's assume there will always be at least 2000 results
		randomized = `&offset=${Math.round(Math.random() * 2000)}`;
	}

	return fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${
			CONFIG.giphy.apiKey
		}&q=${search}${randomized}`
	)
		.then(res => res.json())
		.then(data => {
			// Return the array with images in it
			return Promise.resolve(data.data);
		})
		.catch(e => console.log("ERROR:", e));
}

/**
 * Get some funny gifs
 * @return {Promise}
 */
function getFunnyGifs() {
	return searchGifs("funny");
}

/**
 * Get some Sad gifs
 * @return {Promise}
 */
function getSadGifs() {
	return searchGifs("sad", true);
}

/**
 * Get some cute gifs
 * @return {Promise}
 */
function getCuteGifs() {
	return searchGifs("cute puppy", true);
}

export { getRandomGif, getFunnyGifs, getSadGifs, getCuteGifs };
