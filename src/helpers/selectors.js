export function getAppointmentsForDay(state, day) {
  // debugger;
  const currentDay = state.days.filter((dayInput) => dayInput.name === day)
  // console.log("currentDay", currentDay);
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const appointments = currentDay[0].appointments.map((appnt) => state.appointments[appnt]);
    return appointments;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const interviewerID = {...interview, interviewer: state.interviewers[interview.interviewer]}
  return interviewerID;
}

export function getInterviewersForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day)
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const interviewers = currentDay[0].interviewers.map((interviewer) => state.interviewers[interviewer]);
  
  return interviewers;
}