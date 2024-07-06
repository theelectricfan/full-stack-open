const SearchForm = ({ search, handleSearch }) => {
	return (
		<form>
			<label>
				Country Name:{" "}
				<input
					type="text"
					value={search}
					onChange={handleSearch}
					placeholder="Enter country name"
				/>
			</label>
		</form>
	);
};

const CountryList = ({ countries, showCountryPage }) => {
	return (
		<div>
            {countries.map((country) => (
                <div key={country.name.common} commonname={country.name.common}>{country.name.common} {" "}
                <button onClick={showCountryPage}>Show</button>
                </div>
            ))}
		</div>
	);
};

export { SearchForm, CountryList };
