import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const initialVotes = [];
  anecdotes.forEach((key, idx) => { initialVotes[idx] = 0 });

  const [votes, setVotes] = useState(initialVotes)

  const handleClick = () => {
    const rdmn = Math.ceil(Math.random() * anecdotes.length - 1);
    setSelected(rdmn);
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  console.log('votes : ', votes);

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)