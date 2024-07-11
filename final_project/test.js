const axios = require("axios");
const url = "http://localhost:5000";

async function getBooks() {
	try {
		const response = await axios.get(url);
		console.log("Status Code:", response.status);
		console.log("Books:", response.data);
	} catch (error) {
		console.error("Error:", error);
	}
}

async function findBook() {
	try {
		const response = await axios.get(`${url}/isbn/1`);
		console.log("Status Code:", response.status);
		console.log("Book:", response.data);
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function findBookByAuthor() {
	try {
		const response = await axios.get(`${url}/author/Dante%20Alighieri`);
		console.log("Status Code:", response.status);
		console.log("Books:", response.data);
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function findBookByTitle() {
	try {
		const response = await axios.get(`${url}/title/The%20Epic%20Of%20Gilgamesh`);
		console.log("Status Code:", response.status);
		console.log("Books:", response.data);
	} catch (error) {
		console.error("Error:", error.message);
	}
}

findBookByTitle();
