import axios from "axios";
const url = "http://localhost:3001/api/persons";

const getAll = async () => {
	return axios
		.get(url)
		.then((response) => response.data);
};

const createPerson = async (newPerson) => {
	return axios
		.post(url, newPerson)
		.then((response) => response.data);
};

const updatePerson = async(id, newPerson) => {
    return axios
        .put(`${url}/${id}`, newPerson)
        .then((response) => response.data);
}

const removePerson = async (id) => {
    return axios
        .delete(`${url}/${id}`)
        .then((response) => response.data);
};

export { getAll, createPerson, removePerson, updatePerson };