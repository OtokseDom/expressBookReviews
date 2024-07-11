const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (isValid(username)) {
		users.push({ username: username, password: password });
		res.status(200).send(`User ${username} successfully registered. You can now log in.`);
	} else {
		res.status(400).send(`Username ${username} already taken. Please try again.`);
	}
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	const isbn = req.params.isbn;
	if (books[isbn] === undefined) {
		res.status(404).send("Book not found");
	} else {
		res.status(200).send(JSON.stringify(books[isbn], null, 4));
	}
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	const author = req.params.author;
	const filtered_books = Object.values(books).filter((book) => book.author === author);

	if (filtered_books.length === 0) {
		res.status(404).send(`No such book with author ${author}`);
	} else {
		res.status(200).send(JSON.stringify(filtered_books, null, 4));
	}
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	const title = req.params.title;
	const filtered_books = Object.values(books).filter((book) => book.title === title);

	if (filtered_books.length === 0) {
		res.status(404).send(`No such book with title ${title}`);
	} else {
		res.status(200).send(JSON.stringify(filtered_books, null, 4));
	}
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	const isbn = req.params.isbn;
	if (books[isbn] === undefined) {
		res.status(404).send("Book not found");
	} else {
		if (Object.entries(books[isbn].reviews).length > 0) res.status(200).send(JSON.stringify(books[isbn], null, 4));
		else res.status(200).send("No Reviews");
	}
});

module.exports.general = public_users;
