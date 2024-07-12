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

const Persons = ({ personsToShow, deletePerson }) => {
	return (
		<div>
			{personsToShow.map((person) => (
				<div key={person.id}>
					{person.name} {":"} {person.number} {" "}
                    <button onClick={()=> deletePerson(person.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export { Filter, PersonForm, Persons };
