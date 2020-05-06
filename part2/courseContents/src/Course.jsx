import React from 'react';

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => parts.map((part) => <Part key={part.name} part={part} />);

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Footer = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p><b>total of {total} exercises</b></p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Footer parts={course.parts} />
    </>
  );
}

export default Course;