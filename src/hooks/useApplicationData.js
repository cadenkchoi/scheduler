import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  // credit to Luke B and Devin M for helping/explaining the code involved to create the updateSpots function
  const updateSpots = (dayName, days, appointments) => {
    const dayToUpdate = days.find((day) => day.name === dayName);
    let addToCount = 0;
    for (let app in appointments) {
      if (
        appointments[app].interview === null &&
        dayToUpdate.appointments.includes(appointments[app].id)
      ) {
        addToCount++;
      }
    }
    return { ...dayToUpdate, spots: addToCount };
  }

  const setDay = day => setState(prev => ({...prev, day}));

  const newDaysArr = (dayObj, daysArr) => {
    return daysArr.map((day) => (day.name === dayObj.name ? dayObj : day));
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = newDaysArr(updateSpots(state.day, state.days, appointments), state.days)

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({...state, appointments, days});
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = newDaysArr(updateSpots(state.day, state.days, appointments), state.days)
    return axios.delete(`/api/appointments/${id}`, {interview: null}).then(() => {
      setState({ ...state, appointments, days })
    })
  }
  return {state, setDay, bookInterview, cancelInterview}
}