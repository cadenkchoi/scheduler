export function getAppointmentsForDay(state, day) {
  // debugger;
  const currentDay = state.days.filter((dayInput) => dayInput.name === day)
  console.log("currentDay", currentDay);
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const appointments = currentDay[0].appointments.map((appnt) => state.appointments[appnt]);
    return appointments;
}