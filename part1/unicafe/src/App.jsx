import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value, percent }) => {
	if (percent) {
		return (
			<tbody>
				<tr>
					<td>{text}</td>
					<td>{value} %</td>
				</tr>
			</tbody>
		);
	}
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	if (good + neutral + bad === 0) {
		return <div>No feedback given</div>;
	}
	return (
		<table>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={good + neutral + bad} />
			<StatisticLine
				text="average"
				value={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
			/>
			<StatisticLine
				text="positive"
				value={(good / (good + neutral + bad)) * 100}
				percent={true}
			/>
		</table>
	);
};
const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<Heading text="give feedback" />
			<Button handleClick={handleGoodClick} text="good" />
			<Button handleClick={handleNeutralClick} text="neutral" />
			<Button handleClick={handleBadClick} text="bad" />
			<Heading text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
