const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
	const filtered_users = users.filter((user) => user.username === username);
	if (filtered_users.length === 0) return true;
	else return false;
};

const authenticatedUser = (username, password) => {
	//write code to check if username and password match the one we have in records.
	const filtered_users = users.filter((user) => user.username === username && user.password === password);
	if (filtered_users.length > 0) return true;
	else return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		res.send("username and password is required");
	}

	if (authenticatedUser(username, password)) {
		let accessToken = jwt.sign({ data: password }, "access", { expiresIn: 60 * 60 });
		req.session.authorization = { accessToken, username };
		return res.status(200).send("User successfully logged in");
	} else {
		return res.status(208).json({ message: "Invalid Login. Check username and password" });
	}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const user = req.session.authorization.username;
	const review = req.body.review;

	if (books[isbn] === undefined) res.status(404).send("Book not found");

	if (!review) res.status(400).send(`Review is required`);

	books[isbn].reviews[user] = review;

	res.status(201).send(`Review successfully submitted: ${JSON.stringify(books[isbn], null, 4)}`);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const user = req.session.authorization.username;

	if (books[isbn] === undefined) res.status(404).send("Book not found");

	if (books[isbn].reviews[user] === undefined) res.status(404).send("Review not found");

	if (delete books[isbn].reviews[user]) res.status(200).send(`Your review was deletd. ${JSON.stringify(books[isbn], null, 4)}`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
