import { useEffect, useState } from "react";
import { GetCountries } from "./services/countryServices";
import { CountryPage } from "./components/countryPage";
import { SearchForm, CountryList } from "./components/formComponents";

const App = () => {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [searchDisplay, setSearchDisplay] = useState(null);

	useEffect(() => {
		GetCountries().then((data) => setData(data));
	}, []);

	let countriesToShow = data.filter((country) =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	);

	const showCountryPage = (e) => {
		const countryName = e.target.parentElement.getAttribute("commonname");
		const countryObject = countriesToShow.find(
			(country) => country.name.common === countryName
		);
		setSearchDisplay(<CountryPage country={countryObject} />);
	};

	const handleSearch = (event) => {
		const newSearch = event.target.value;
		setSearch(newSearch);
		countriesToShow = data.filter((country) =>
			country.name.common.toLowerCase().includes(newSearch.toLowerCase())
		);
		if (newSearch === "") {
			setSearchDisplay(null);
		} else if (countriesToShow.length > 10) {
			setSearchDisplay("Too many matches, specify another filter");
		} else if (countriesToShow.length === 1) {
			setSearchDisplay(<CountryPage country={countriesToShow[0]} />);
		} else if (countriesToShow.length === 0) {
			setSearchDisplay("No matches");
		} else {
			setSearchDisplay(
				<CountryList
					countries={countriesToShow}
					showCountryPage={showCountryPage}
				/>
			);
		}
	};

	return (
		<div>
			<SearchForm search={search} handleSearch={handleSearch} />
			<div>{searchDisplay}</div>
		</div>
	);
};

export default App;
