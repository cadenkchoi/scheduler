import React from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
    .catch((error) => {transition(ERROR_SAVE, true)})
  }

  const deleteApp = () => {
    transition(DELETING, true)

    props.cancelInterview(props.id).then(() => {
      transition(EMPTY)
    })
    .catch((error) => {transition(ERROR_DELETE, true)})
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => {transition(CONFIRM)}}
        onEdit={() => {transition(EDIT)}}
      />
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteApp}
          onCancel={back}
        />)}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewers={props.interviewers}
        interview={props.id}
        onSave={save}
        onCancel={back}
        interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save" onClose={back}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete" onClose={back}/>
      )}
      {mode === SAVING && (
      <Status message="Saving"/>)}
    </article>
  )
}