import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  return (
    <div>
      <Header course={course} />

      <Content parts={parts} />

      <Footer parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))