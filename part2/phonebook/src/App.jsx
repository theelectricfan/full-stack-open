import { useState, useEffect } from "react";
import {
	getAll,
	createPerson,
	removePerson,
	updatePerson,
} from "./services/persons";
import { Filter, PersonForm, Persons } from "./components/persons";
import "./index.css";

const App = () => {
	const [persons, setPersons] = useState(null);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [message, setMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);
	const personsToShow =
		persons === null
			? []
			: persons.filter((person) =>
					person.name.toLowerCase().includes(filter.toLowerCase())
			  );

	useEffect(() => {
		getAll()
			.then((data) => setPersons(data))
			.catch((error) => console.log(error));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with the new one?`
				)
			) {
				const idToUpdate = persons.find((person) => person.name === newName).id;
				updatePerson(idToUpdate, {
					name: newName,
					number: newNumber,
				})
					.then((data) => {
						setMessageType("success");
						setMessage(`Updated ${data.name}`);
						setTimeout(() => {
							setMessage(null);
							setMessageType(null);
						}, 5000);
						setPersons(
							persons.map((person) => (person.id === data.id ? data : person))
						);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						setMessageType("error");
						setMessage(
							`Information of ${newName} has already been removed from server`
						);
						setPersons(persons.filter((person) => person.id !== idToUpdate));
						setNewName("");
						setNewNumber("");
						setTimeout(() => {
							setMessage(null);
							setMessageType(null);
						}, 5000);
					});
			}
			return;
		}
		const newPerson = { name: newName, number: newNumber };
		createPerson(newPerson).then((data) => {
			setMessageType("success");
			setMessage(`Added ${data.name}`);
			setTimeout(() => {
				setMessage(null);
				setMessageType(null);
			}, 5000);
			setPersons([...persons, data]);
			setNewName("");
			setNewNumber("");
		});
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

	const deletePerson = (id) => {
		const person = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${person.name}?`)) {
			removePerson(id).then((data) => {
				setMessageType("success");
				setMessage(`Deleted ${data.name} contact`);
				setTimeout(() => {
					setMessage(null);
					setMessageType(null);
				}, 5000);
				setPersons(persons.filter((person) => person.id !== id));
            }).catch((error) => {
                setMessageType("error");
                setMessage(`Information of ${person.name} has already been removed from server`);
                setTimeout(() => {
                    setMessage(null);
                    setMessageType(null);
                }, 5000);
                setPersons(persons.filter((person) => person.id !== id));
            });
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div className={messageType}>{message}</div> <br />
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
			<Persons personsToShow={personsToShow} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
