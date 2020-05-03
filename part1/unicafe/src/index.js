import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './feedback/Button';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;

  return (
    <>
      <h1>give feedback</h1>

      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="nuetral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />

      <h1>statistics</h1>

      <p>{`good ${good}`}</p>
      <p>{`nuetral ${neutral}`}</p>
      <p>{`bad ${bad}`}</p>
      <p>{`all ${good + neutral + bad}`}</p>
      <p>{`average ${(good - bad) / total}`}</p>
      <p>{`positive ${(good * 100) / total}`}</p>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)