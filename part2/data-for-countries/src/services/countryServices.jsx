import axios from "axios";
const URL = "https://restcountries.com/v3.1/all";

const GetCountries = async () => {
    const response = await axios.get(URL);
    return response.data;
}


export { GetCountries }