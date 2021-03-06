import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';

// Functional React Component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |
      <button href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}> delete</button>
    </td>
  </tr>
)


// Class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  // gets all exercises to show on page
  componentDidMount() {
    axios.get('/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deletes exercise from list
  deleteExercise(id) {
    axios.delete('/exercises/' + id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(element => element._id !== id)
    })
  }
  
exerciseList() {
  return this.state.exercises.map(currentexercise => {
    return <Exercise 
      exercise={currentexercise} 
      deleteExercise={this.deleteExercise}  
      key={currentexercise._id}
      />
  })
}

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}