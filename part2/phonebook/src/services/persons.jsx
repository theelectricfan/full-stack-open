import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
	return axios
		.get(url)
		.then((response) => response.data);
};

const createPerson = (newPerson) => {
	return axios
		.post(url, newPerson)
		.then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
    return axios
        .put(`${url}/${id}`, newPerson)
        .then((response) => response.data);
}

const removePerson = (id) => {
    return axios
        .delete(`${url}/${id}`)
        .then((response) => response.data);
};

export { getAll, createPerson, removePerson, updatePerson };