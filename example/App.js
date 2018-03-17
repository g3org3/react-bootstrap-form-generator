import React from 'react'
import Form from 'react-bootstrap-form-generator'

const userSchema = {
  name: 'string',
  email: {
    type: 'string:email',
    label: 'Personal Email',
  },
  password: {
    type: 'string:password',
    disabled: true
  },
  country: {
    label: 'Select your country',
    type: 'select',
    options: [
      {
        label: 'Guatemala',
        value: 'GT'
      },
      {
        label: 'France',
        value: 'FR'
      }
    ]
  },
  time: {
    type: 'string:time',
    label: 'At what time?'
  },
  date: {
    type: 'string:date',
    label: 'Your birth date'
  },
  features: {
    type: 'checkbox',
    label: 'Select the features!',
    options: [
      { value: 'beta', label: 'Experimental!' },
      { value: 'stable', label: 'Normal'}
    ]
  },
  order: {
    type: 'radio',
    label: 'How many would you like to order?',
    options: [
      { value: 1, label: '1 - $10' },
      { value: 2, label: '2 - $40' },
      { value: 3, label: '3 - $60' }
    ]
  },
  comment: {
    type: 'textarea'
  }
}

const handleSubmit = (data) => {
  console.log(data)
}
const layout = [
  [4, 4, 4],
  [6, 6],
  [4, 4, 4],
  [12]
]
export default () => (<React.Fragment>
  <div className="navbar navbar-default navbar-static-top" />
  <div className="container">
    <h1>Example of generated form</h1>
    <Form
      verbose={false}
      layout={layout}
      schema={userSchema}
      submitLabel="send it!"
      onSubmit={(data) => handleSubmit(data)}
    />
  </div>
</React.Fragment>)
