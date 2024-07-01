import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, changeFilter }) => {
	return (
		<form>
			<label>
				filter shown with:{" "}
				<input type="text" value={filter} onChange={changeFilter}></input>
			</label>
		</form>
	);
};

const PersonForm = ({
	addPerson,
	newName,
	changeNewName,
	newNumber,
	changeNewNumber,
}) => {
	return (
		<form onSubmit={addPerson}>
			<label>
				Name:{" "}
				<input type="text" value={newName} onChange={changeNewName}></input>
			</label>
			{<br />}
			<label>
				Phone Number:{" "}
				<input type="text" value={newNumber} onChange={changeNewNumber}></input>
			</label>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ personsToShow }) => {
	return (
		<div>
			{personsToShow.map((person) => (
				<div key={person.id}>
					{person.name} {person.number}
				</div>
			))}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	);

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
        }).catch((error) => {
            console.log(error);
        });
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons([...persons, { name: newName, number: newNumber }]);
		setNewName("");
		setNewNumber("");
	};

	const changeNewName = (e) => {
		setNewName(e.target.value);
	};

	const changeNewNumber = (e) => {
		setNewNumber(e.target.value);
	};

	const changeFilter = (e) => {
		setFilter(e.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} changeFilter={changeFilter} />
			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				changeNewName={changeNewName}
				newNumber={newNumber}
				changeNewNumber={changeNewNumber}
			/>
			<h2>numbers</h2>
			<Persons personsToShow={personsToShow} />
		</div>
	);
};

export default App;
