import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './feedback/Button';

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all ? ((good - bad) / all).toFixed(1) : 'NA';
  const positive = all ? `${((good * 100) / all).toFixed(1)} %` : 'NA';

  if (!all) return <p>No feedback given</p>

  return (
    <>
      <h1>statistics</h1>

      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>

      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="nuetral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)