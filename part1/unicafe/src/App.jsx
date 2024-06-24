import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>

const Statistics = ({rating, count}) =>{
    return (
        <div>{rating} {count}</div>
    )
}
const App = () =>{
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Heading text="give feedback"/>
            <Button handleClick={handleGoodClick} text="good"/>
            <Button handleClick={handleNeutralClick} text="neutral"/>
            <Button handleClick={handleBadClick} text ="bad" />
            <Heading text="statistics"/>
            <Statistics rating="good" count={good}/>
            <Statistics rating="neutral" count={neutral}/>
            <Statistics rating="bad" count={bad}/>
        </div>
    )
}

export default App
