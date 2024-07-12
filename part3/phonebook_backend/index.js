const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("build"));

app.use(morgan(function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ');
}))
app.use(cors());
app.use(express.json());

let contacts = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons/", (request, response) => {
	console.log("GET /api/persons");
	response.json(contacts);
});

app.get("/info", (request, response) => {
	response.send(
		`<p>Phonebook has info for ${
			contacts.length
		} people</p><p>${new Date()}</p>`
	);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const contact = contacts.find((contact) => contact.id === id);
	if (contact) {
		response.json(contact);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	contacts = contacts.filter((contact) => contact.id !== id);
	response.status(204).end();
});

const generateId = () => {
	return Math.floor(Math.random() * 10000);
};

app.post("/api/persons", (request, response) => {
	const contact = request.body;
	if (!contact.name || !contact.number) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	if (contacts.find((person) => person.name === contact.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}
	const person = {
		id: String(generateId()),
		name: contact.name,
		number: contact.number,
	};
	contacts = contacts.concat(person);
	response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
