import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
import helpers from "./utils/helpers";
//import uuid from "../vendor/uuid";
class TimerDashboard extends React.Component {

  state = {
    timers: [
      {
        title: 'Practice squat',
        project: 'Gym Chores',
        // id: require('uniqid'),
        id: genereateUniqueNo(),
        elapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        //id: require('uniqid'),
        id: genereateUniqueNo(),
        elapsed: 1273998,
        runningSince: null,
      },
    ],
  };
  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  // Inside TimersDashboard
  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  };

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        console.log(timer.id);
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        }
        else {
          return timer;
        }
      }),
    });
  };
  handleDelete = (timerId) => {
     this.setState({
       timers:this.state.timers.filter(t=>t.id !== timerId),
     });
  };
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          { /* Inside TimersDashboard.render() */}
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onDeleteSubmit={this.handleDelete}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
            onDeleteSubmit={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}


function genereateUniqueNo() {
  const rand = 1 + Math.random() * (100 - 0);
  return rand;
}
export default TimerDashboard;