import React from 'react';
import Button from 'components/Button';

export default function Confirm(props) {
  return (
  <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">{props && props.message}</h1>
    <section className="appointment__actions">
      <Button danger onClick={props && props.onCancel}>Cancel</Button>
      <Button danger onClick={props && props.onConfirm}>Confirm</Button>
    </section>
  </main>
  )
}